import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

// Types
export interface DatabaseInstance {
  id: string
  name: string
  type: "PostgreSQL" | "MongoDB" | "Redis" | "MySQL" | "ClickHouse"
  status: "active" | "maintenance" | "inactive"
  size: string
  tables: number
  records: number
  connections: number
  lastAccess: string
  performance: number
  backup: "automated" | "manual"
  createdAt: string
  updatedAt: string
}

export interface QueryLog {
  id: string
  query: string
  database: string
  duration: string
  status: "completed" | "failed" | "running"
  timestamp: string
  user: string
  executionPlan?: string
  rowsAffected?: number
}

export interface DatabaseMetrics {
  totalDatabases: number
  totalTables: number
  totalRecords: number
  storageUsed: number
  storageTotal: number
  activeConnections: number
  maxConnections: number
  queryPerformance: number
  uptime: string
  lastBackup: string
  cpuUsage: number
  memoryUsage: number
  diskIO: number
  networkUsage: number
}

export interface DatabaseState {
  databases: DatabaseInstance[]
  queryLogs: QueryLog[]
  metrics: DatabaseMetrics | null
  selectedDatabase: string | null
  loading: {
    databases: boolean
    queries: boolean
    metrics: boolean
    operations: boolean
  }
  error: {
    databases: string | null
    queries: string | null
    metrics: string | null
    operations: string | null
  }
  filters: {
    search: string
    status: string
    type: string
  }
  pagination: {
    page: number
    limit: number
    total: number
  }
}

const initialState: DatabaseState = {
  databases: [],
  queryLogs: [],
  metrics: null,
  selectedDatabase: null,
  loading: {
    databases: false,
    queries: false,
    metrics: false,
    operations: false,
  },
  error: {
    databases: null,
    queries: null,
    metrics: null,
    operations: null,
  },
  filters: {
    search: "",
    status: "all",
    type: "all",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
}

// Async Thunks
export const fetchDatabases = createAsyncThunk(
  "database/fetchDatabases",
  async (params: { page?: number; limit?: number; search?: string; status?: string }) => {
    const response = await fetch(
      "/api/admin/databases?" +
        new URLSearchParams({
          page: params.page?.toString() || "1",
          limit: params.limit?.toString() || "10",
          search: params.search || "",
          status: params.status || "all",
        }),
    )

    if (!response.ok) {
      throw new Error("Failed to fetch databases")
    }

    return response.json()
  },
)

export const fetchDatabaseMetrics = createAsyncThunk("database/fetchMetrics", async () => {
  const response = await fetch("/api/admin/databases/metrics")

  if (!response.ok) {
    throw new Error("Failed to fetch database metrics")
  }

  return response.json()
})

export const fetchQueryLogs = createAsyncThunk(
  "database/fetchQueryLogs",
  async (params: { databaseId?: string; limit?: number }) => {
    const response = await fetch(
      "/api/admin/databases/queries?" +
        new URLSearchParams({
          databaseId: params.databaseId || "",
          limit: params.limit?.toString() || "50",
        }),
    )

    if (!response.ok) {
      throw new Error("Failed to fetch query logs")
    }

    return response.json()
  },
)

export const createDatabase = createAsyncThunk("database/create", async (databaseData: Partial<DatabaseInstance>) => {
  const response = await fetch("/api/admin/databases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(databaseData),
  })

  if (!response.ok) {
    throw new Error("Failed to create database")
  }

  return response.json()
})

export const updateDatabase = createAsyncThunk(
  "database/update",
  async ({ id, data }: { id: string; data: Partial<DatabaseInstance> }) => {
    const response = await fetch(`/api/admin/databases/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to update database")
    }

    return response.json()
  },
)

export const deleteDatabase = createAsyncThunk("database/delete", async (id: string) => {
  const response = await fetch(`/api/admin/databases/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete database")
  }

  return { id }
})

export const backupDatabase = createAsyncThunk("database/backup", async (id: string) => {
  const response = await fetch(`/api/admin/databases/${id}/backup`, {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error("Failed to backup database")
  }

  return response.json()
})

export const restoreDatabase = createAsyncThunk(
  "database/restore",
  async ({ id, backupId }: { id: string; backupId: string }) => {
    const response = await fetch(`/api/admin/databases/${id}/restore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ backupId }),
    })

    if (!response.ok) {
      throw new Error("Failed to restore database")
    }

    return response.json()
  },
)

// Slice
const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setSelectedDatabase: (state, action: PayloadAction<string | null>) => {
      state.selectedDatabase = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<DatabaseState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action: PayloadAction<Partial<DatabaseState["pagination"]>>) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    clearErrors: (state) => {
      state.error = {
        databases: null,
        queries: null,
        metrics: null,
        operations: null,
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
      state.pagination = initialState.pagination
    },
  },
  extraReducers: (builder) => {
    // Fetch Databases
    builder
      .addCase(fetchDatabases.pending, (state) => {
        state.loading.databases = true
        state.error.databases = null
      })
      .addCase(fetchDatabases.fulfilled, (state, action) => {
        state.loading.databases = false
        state.databases = action.payload.databases
        state.pagination.total = action.payload.total
      })
      .addCase(fetchDatabases.rejected, (state, action) => {
        state.loading.databases = false
        state.error.databases = action.error.message || "Failed to fetch databases"
      })

    // Fetch Metrics
    builder
      .addCase(fetchDatabaseMetrics.pending, (state) => {
        state.loading.metrics = true
        state.error.metrics = null
      })
      .addCase(fetchDatabaseMetrics.fulfilled, (state, action) => {
        state.loading.metrics = false
        state.metrics = action.payload
      })
      .addCase(fetchDatabaseMetrics.rejected, (state, action) => {
        state.loading.metrics = false
        state.error.metrics = action.error.message || "Failed to fetch metrics"
      })

    // Fetch Query Logs
    builder
      .addCase(fetchQueryLogs.pending, (state) => {
        state.loading.queries = true
        state.error.queries = null
      })
      .addCase(fetchQueryLogs.fulfilled, (state, action) => {
        state.loading.queries = false
        state.queryLogs = action.payload.queries
      })
      .addCase(fetchQueryLogs.rejected, (state, action) => {
        state.loading.queries = false
        state.error.queries = action.error.message || "Failed to fetch query logs"
      })

    // Create Database
    builder
      .addCase(createDatabase.pending, (state) => {
        state.loading.operations = true
        state.error.operations = null
      })
      .addCase(createDatabase.fulfilled, (state, action) => {
        state.loading.operations = false
        state.databases.unshift(action.payload)
      })
      .addCase(createDatabase.rejected, (state, action) => {
        state.loading.operations = false
        state.error.operations = action.error.message || "Failed to create database"
      })

    // Update Database
    builder
      .addCase(updateDatabase.pending, (state) => {
        state.loading.operations = true
        state.error.operations = null
      })
      .addCase(updateDatabase.fulfilled, (state, action) => {
        state.loading.operations = false
        const index = state.databases.findIndex((db) => db.id === action.payload.id)
        if (index !== -1) {
          state.databases[index] = action.payload
        }
      })
      .addCase(updateDatabase.rejected, (state, action) => {
        state.loading.operations = false
        state.error.operations = action.error.message || "Failed to update database"
      })

    // Delete Database
    builder
      .addCase(deleteDatabase.pending, (state) => {
        state.loading.operations = true
        state.error.operations = null
      })
      .addCase(deleteDatabase.fulfilled, (state, action) => {
        state.loading.operations = false
        state.databases = state.databases.filter((db) => db.id !== action.payload.id)
      })
      .addCase(deleteDatabase.rejected, (state, action) => {
        state.loading.operations = false
        state.error.operations = action.error.message || "Failed to delete database"
      })

    // Backup Database
    builder
      .addCase(backupDatabase.pending, (state) => {
        state.loading.operations = true
        state.error.operations = null
      })
      .addCase(backupDatabase.fulfilled, (state) => {
        state.loading.operations = false
      })
      .addCase(backupDatabase.rejected, (state, action) => {
        state.loading.operations = false
        state.error.operations = action.error.message || "Failed to backup database"
      })

    // Restore Database
    builder
      .addCase(restoreDatabase.pending, (state) => {
        state.loading.operations = true
        state.error.operations = null
      })
      .addCase(restoreDatabase.fulfilled, (state) => {
        state.loading.operations = false
      })
      .addCase(restoreDatabase.rejected, (state, action) => {
        state.loading.operations = false
        state.error.operations = action.error.message || "Failed to restore database"
      })
  },
})

export const { setSelectedDatabase, setFilters, setPagination, clearErrors, resetFilters } = databaseSlice.actions

export default databaseSlice.reducer

// Selectors
export const selectDatabases = (state: { database: DatabaseState }) => state.database.databases
export const selectDatabaseMetrics = (state: { database: DatabaseState }) => state.database.metrics
export const selectQueryLogs = (state: { database: DatabaseState }) => state.database.queryLogs
export const selectSelectedDatabase = (state: { database: DatabaseState }) => state.database.selectedDatabase
export const selectDatabaseLoading = (state: { database: DatabaseState }) => state.database.loading
export const selectDatabaseError = (state: { database: DatabaseState }) => state.database.error
export const selectDatabaseFilters = (state: { database: DatabaseState }) => state.database.filters
export const selectDatabasePagination = (state: { database: DatabaseState }) => state.database.pagination

// Computed selectors
export const selectFilteredDatabases = (state: { database: DatabaseState }) => {
  const { databases, filters } = state.database

  return databases.filter((db) => {
    const matchesSearch =
      db.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      db.type.toLowerCase().includes(filters.search.toLowerCase())
    const matchesStatus = filters.status === "all" || db.status === filters.status
    const matchesType = filters.type === "all" || db.type === filters.type

    return matchesSearch && matchesStatus && matchesType
  })
}

export const selectDatabaseById = (state: { database: DatabaseState }, id: string) => {
  return state.database.databases.find((db) => db.id === id)
}
