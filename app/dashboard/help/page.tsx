"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import {
  HelpCircle,
  Book,
  FileText,
  MessageSquare,
  Search,
  ChevronRight,
  Mail,
  Phone,
  Video,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"

// Mock FAQ data
const faqCategories = [
  {
    id: "general",
    title: "General",
    icon: HelpCircle,
    questions: [
      {
        id: "what-is",
        question: "What is Admin Portal?",
        answer:
          "Admin Portal is a comprehensive dashboard for managing users, content, and analytics for your platform. It provides tools for user management, content creation, analytics tracking, and system administration.",
      },
      {
        id: "get-started",
        question: "How do I get started?",
        answer:
          "To get started, log in with your admin credentials. You'll be directed to the dashboard where you can see an overview of your platform's performance. Navigate through the sidebar to access different sections like Users, Content, and Settings.",
      },
      {
        id: "roles",
        question: "What are the different user roles?",
        answer:
          "Admin Portal supports multiple user roles including Super Admin, Content Manager, and Analyst. Each role has different permissions and access levels to ensure proper security and workflow management.",
      },
    ],
  },
  {
    id: "users",
    title: "User Management",
    icon: FileText,
    questions: [
      {
        id: "add-user",
        question: "How do I add a new user?",
        answer:
          "To add a new user, navigate to the Users section and click the 'Add User' button. Fill in the required information including name, email, and role. You can also set their initial password or send them an invitation to set their own password.",
      },
      {
        id: "edit-user",
        question: "How do I edit user information?",
        answer:
          "To edit a user's information, go to the Users section, find the user you want to edit, and click on the edit icon or their name. You can then modify their details and save the changes.",
      },
      {
        id: "delete-user",
        question: "How do I delete a user?",
        answer:
          "To delete a user, navigate to the Users section, find the user you want to remove, click the more options menu (three dots), and select 'Delete'. You'll be asked to confirm this action as it cannot be undone.",
      },
    ],
  },
  {
    id: "content",
    title: "Content Management",
    icon: Book,
    questions: [
      {
        id: "create-content",
        question: "How do I create new content?",
        answer:
          "To create new content, go to the Content section and click the 'Create Content' button. Choose the type of content you want to create (article, video, etc.), fill in the details, and publish or save as draft.",
      },
      {
        id: "schedule-content",
        question: "Can I schedule content for later publication?",
        answer:
          "Yes, you can schedule content for future publication. When creating or editing content, set the publication date and time in the future, and the system will automatically publish it at the specified time.",
      },
      {
        id: "content-analytics",
        question: "How do I view content performance?",
        answer:
          "To view content performance, go to the Content section and click on a specific piece of content. You'll see analytics including views, engagement rate, and user interactions. You can also access more detailed analytics in the Reports section.",
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & Subscriptions",
    icon: MessageSquare,
    questions: [
      {
        id: "change-plan",
        question: "How do I change my subscription plan?",
        answer:
          "To change your subscription plan, go to the Settings section and select the 'Billing' tab. You'll see your current plan and options to upgrade or downgrade. Select the plan you want and follow the prompts to complete the change.",
      },
      {
        id: "payment-methods",
        question: "How do I update my payment method?",
        answer:
          "To update your payment method, navigate to Settings > Billing > Payment Methods. You can add a new payment method, set a default method, or remove existing methods.",
      },
      {
        id: "invoice-history",
        question: "Where can I find my invoice history?",
        answer:
          "Your invoice history is available in the Settings section under the 'Billing' tab. Scroll down to the 'Billing History' section to view and download past invoices.",
      },
    ],
  },
]

// Mock documentation links
const documentationLinks = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of using the Admin Portal",
    icon: Book,
    url: "#",
  },
  {
    title: "User Management",
    description: "How to manage users, roles, and permissions",
    icon: FileText,
    url: "#",
  },
  {
    title: "Content Creation",
    description: "Guidelines for creating and managing content",
    icon: FileText,
    url: "#",
  },
  {
    title: "Analytics & Reporting",
    description: "Understanding your platform's performance",
    icon: FileText,
    url: "#",
  },
  {
    title: "API Documentation",
    description: "Technical documentation for developers",
    icon: FileText,
    url: "#",
  },
  {
    title: "Security Best Practices",
    description: "Keeping your account and data secure",
    icon: FileText,
    url: "#",
  },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [activeCategory, setActiveCategory] = useState("general")
  const { toast } = useToast()

  // Filter FAQs based on search term
  const filteredFAQs = searchTerm
    ? faqCategories.flatMap((category) =>
        category.questions
          .filter(
            (q) =>
              q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((q) => ({ ...q, category: category.title })),
      )
    : []

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    toast({
      title: "Support request submitted",
      description: "We'll get back to you as soon as possible.",
    })
    // Reset form
    setContactFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Support
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg -z-10" />
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-6">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold">How can we help you today?</h2>
              <p className="text-muted-foreground">
                Search our knowledge base or browse the documentation to find answers to your questions.
              </p>
              <div className="relative mt-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for help..."
                  className="pl-10 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {searchTerm && filteredFAQs.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg">
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground mb-2">{filteredFAQs.length} results found</p>
                    <div className="space-y-2">
                      {filteredFAQs.map((faq) => (
                        <div key={faq.id} className="p-2 hover:bg-muted rounded-md">
                          <p className="font-medium">{faq.question}</p>
                          <p className="text-xs text-muted-foreground">Category: {faq.category}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="flex flex-col items-center text-center p-6">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <Book className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mb-2">Documentation</CardTitle>
          <CardDescription className="mb-4">
            Browse our comprehensive documentation to learn how to use the Admin Portal.
          </CardDescription>
          <Button variant="outline" className="mt-auto w-full" asChild>
            <a href="#documentation">
              View Documentation
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Card>
        <Card className="flex flex-col items-center text-center p-6">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mb-2">FAQs</CardTitle>
          <CardDescription className="mb-4">
            Find answers to commonly asked questions about the Admin Portal.
          </CardDescription>
          <Button variant="outline" className="mt-auto w-full" asChild>
            <a href="#faqs">
              View FAQs
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Card>
        <Card className="flex flex-col items-center text-center p-6">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mb-2">Contact Support</CardTitle>
          <CardDescription className="mb-4">
            Can't find what you're looking for? Contact our support team for assistance.
          </CardDescription>
          <Button variant="outline" className="mt-auto w-full" asChild>
            <a href="#contact">
              Contact Us
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Card>
      </div>

      <div id="documentation" className="scroll-mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>
              Browse our comprehensive documentation to learn how to use the Admin Portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {documentationLinks.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  className="flex flex-col h-full rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <doc.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium flex items-center">
                        {doc.title}
                        <ExternalLink className="ml-1 h-3 w-3 text-muted-foreground" />
                      </h3>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div id="faqs" className="scroll-mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to commonly asked questions about the Admin Portal.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {faqCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {faqCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-4">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <p>{faq.answer}</p>
                            <div className="flex items-center justify-end gap-4 pt-2">
                              <span className="text-xs text-muted-foreground">Was this helpful?</span>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Can't find what you're looking for?{" "}
              <a href="#contact" className="text-primary hover:underline">
                Contact our support team
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>

      <div id="contact" className="scroll-mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Get in touch with our support team for assistance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Support Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email Support</h4>
                        <p className="text-sm text-muted-foreground">
                          Send us an email and we'll respond within 24 hours.
                        </p>
                        <a href="mailto:support@example.com" className="text-sm text-primary hover:underline">
                          support@example.com
                        </a>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Phone Support</h4>
                        <p className="text-sm text-muted-foreground">Call us Monday to Friday, 9am to 5pm EST.</p>
                        <a href="tel:+1234567890" className="text-sm text-primary hover:underline">
                          +1 (234) 567-890
                        </a>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Video Support</h4>
                        <p className="text-sm text-muted-foreground">Schedule a video call with our support team.</p>
                        <Button variant="link" className="h-auto p-0 text-sm">
                          Schedule a Call
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Support Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Monday - Friday</span>
                      <span className="text-sm font-medium">9:00 AM - 5:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Saturday</span>
                      <span className="text-sm font-medium">10:00 AM - 2:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Sunday</span>
                      <span className="text-sm font-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={contactFormData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={contactFormData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={contactFormData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your issue in detail..."
                      className="min-h-[150px]"
                      value={contactFormData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
