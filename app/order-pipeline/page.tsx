"use client"

import React from "react"
import { useState } from "react"
import {
  FileText,
  Calculator,
  ShoppingBag,
  CheckCircle,
  CheckSquare,
  XCircle,
  Archive,
  Download,
  RefreshCw,
  Plus,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  Settings,
  List,
  Package,
  Users,
  Check,
  X,
  Clock,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"

// Define approval status types
type ApprovalStatus = "required" | "approved" | "rejected" | "not_required"

// Define approval types
interface Approval {
  type: "product" | "deployment" | "local_risk" | "global_risk" | "engagement"
  status: ApprovalStatus
  approver?: string
  email?: string
  date?: string
  comments?: string
}

export default function OrderPipelinePage() {
  // Sample data for orders with updated SKU format and approval information
  const sampleOrders = [
    // DRAFTS - All approvals pending
    {
      id: "DFT-2023-0001",
      name: "STAT Implementation - Draft",
      engagementCode: "GBFSI-2023-9999",
      country: "United States",
      skuNumber: "1001039-001-aaa",
      skuDescription: "Single Tenant Small/Medium",
      orderDate: new Date("2023-10-20T14:30:00-04:00"),
      commercialOwner: "Sarah Johnson",
      productApprovalRequired: true,
      engagementPartner: "Michael Chen",
      orderedBy: "Alex Johnson",
      stage: "draft",
      // All approvals required (pending)
      approvals: [
        { type: "product", status: "required", approver: "Product Team", email: "product.review@ey.com" },
        { type: "deployment", status: "required", approver: "Technical Team", email: "tech.deploy@ey.com" },
        { type: "local_risk", status: "required", approver: "Local Risk", email: "risk.local@us.ey.com" },
        { type: "global_risk", status: "required", approver: "Global Risk", email: "risk.global@ey.com" },
        { type: "engagement", status: "required", approver: "Michael Chen", email: "michael.chen@ey.com" },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-1234-5678",
      engagementTeam: [
        { role: "Engagement Partner", name: "Michael Chen" },
        { role: "Senior Manager", name: "Jessica Wong" },
        { role: "Manager", name: "David Smith" },
        { role: "Associate", name: "Robert Johnson" },
      ],
      skuDetails: {
        fullDescription:
          "The Single-Tenant Small/Medium solution provides dedicated infrastructure for organizations requiring enhanced security, customization options, and performance.",
        increments: "Monthly",
        minIncrements: 1,
        cost: "$2,000 per month",
      },
      orderItems: [
        { name: "STAT Implementation Services", quantity: 1, cost: "$5,000" },
        { name: "Single Tenant Small/Medium License", quantity: 1, cost: "$2,000/month" },
        { name: "Training Package", quantity: 1, cost: "$1,500" },
      ],
    },
    {
      id: "DFT-2023-0002",
      name: "Data Analytics Platform - Draft",
      engagementCode: "ENERGY-2023-8888",
      country: "Canada",
      skuNumber: "1001039-002-bbb",
      skuDescription: "Multi Tenant Analytics",
      orderDate: new Date("2023-10-19T11:45:00-04:00"),
      commercialOwner: "David Williams",
      productApprovalRequired: true,
      engagementPartner: "Jennifer Lopez",
      orderedBy: "Emma Williams",
      stage: "draft",
      // All approvals required (pending)
      approvals: [
        { type: "product", status: "required", approver: "Product Team", email: "product.review@ey.com" },
        { type: "deployment", status: "required", approver: "Technical Team", email: "tech.deploy@ey.com" },
        { type: "local_risk", status: "required", approver: "Local Risk", email: "risk.local@ca.ey.com" },
        { type: "global_risk", status: "required", approver: "Global Risk", email: "risk.global@ey.com" },
        { type: "engagement", status: "required", approver: "Jennifer Lopez", email: "jennifer.lopez@ey.com" },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-2345-6789",
      engagementTeam: [
        { role: "Engagement Partner", name: "Jennifer Lopez" },
        { role: "Senior Manager", name: "Thomas Brown" },
        { role: "Manager", name: "Sarah Miller" },
        { role: "Associate", name: "James Wilson" },
      ],
      skuDetails: {
        fullDescription:
          "Multi-tenant analytics platform with shared infrastructure and dedicated data isolation for cost-effective business intelligence.",
        increments: "Monthly",
        minIncrements: 5,
        cost: "$1,500 per month",
      },
      orderItems: [
        { name: "Analytics Platform Setup", quantity: 1, cost: "$3,500" },
        { name: "Multi Tenant License", quantity: 1, cost: "$1,500/month" },
        { name: "Data Migration Services", quantity: 1, cost: "$2,000" },
      ],
    },

    // ESTIMATES - All approvals pending
    {
      id: "EST-2023-0001",
      name: "Cloud Security Implementation - Estimate",
      engagementCode: "TECH-2023-7777",
      country: "Germany",
      skuNumber: "1001039-003-ccc",
      skuDescription: "Cloud Security Services",
      orderDate: new Date("2023-10-18T09:15:00-04:00"),
      commercialOwner: "Robert Smith",
      productApprovalRequired: true,
      engagementPartner: "Anna Mueller",
      orderedBy: "Thomas Schmidt",
      stage: "estimate",
      // All approvals required (pending)
      approvals: [
        { type: "product", status: "required", approver: "Product Team", email: "product.review@ey.com" },
        { type: "deployment", status: "required", approver: "Technical Team", email: "tech.deploy@ey.com" },
        { type: "local_risk", status: "required", approver: "Local Risk", email: "risk.local@de.ey.com" },
        { type: "global_risk", status: "required", approver: "Global Risk", email: "risk.global@ey.com" },
        { type: "engagement", status: "required", approver: "Anna Mueller", email: "anna.mueller@de.ey.com" },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-3456-7890",
      engagementTeam: [
        { role: "Engagement Partner", name: "Anna Mueller" },
        { role: "Senior Manager", name: "Hans Schmidt" },
        { role: "Manager", name: "Lukas Weber" },
        { role: "Associate", name: "Sophie Becker" },
      ],
      skuDetails: {
        fullDescription:
          "Comprehensive cloud security services including threat detection, compliance monitoring, and security posture management.",
        increments: "Monthly",
        minIncrements: 1,
        cost: "$3,000 per month",
      },
      orderItems: [
        { name: "Cloud Security Assessment", quantity: 1, cost: "$4,500" },
        { name: "Security Monitoring License", quantity: 1, cost: "$3,000/month" },
        { name: "Security Training", quantity: 1, cost: "$1,200" },
      ],
    },
    {
      id: "EST-2023-0002",
      name: "AI Development Framework License - Estimate",
      engagementCode: "TECH-2023-6666",
      country: "United Kingdom",
      skuNumber: "1001039-004-ddd",
      skuDescription: "AI Development Framework",
      orderDate: new Date("2023-10-17T16:37:00-04:00"),
      commercialOwner: "Emily Brown",
      productApprovalRequired: true,
      engagementPartner: "James Wilson",
      orderedBy: "Olivia Taylor",
      stage: "estimate",
      // All approvals required (pending)
      approvals: [
        { type: "product", status: "required", approver: "Product Team", email: "product.review@uk.ey.com" },
        { type: "deployment", status: "required", approver: "Technical Team", email: "tech.deploy@uk.ey.com" },
        { type: "local_risk", status: "required", approver: "Local Risk", email: "risk.local@uk.ey.com" },
        { type: "global_risk", status: "required", approver: "Global Risk", email: "risk.global@ey.com" },
        { type: "engagement", status: "required", approver: "James Wilson", email: "james.wilson@uk.ey.com" },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-4567-8901",
      engagementTeam: [
        { role: "Engagement Partner", name: "James Wilson" },
        { role: "Senior Manager", name: "Emma Thompson" },
        { role: "Manager", name: "Oliver Davis" },
        { role: "Associate", name: "Charlotte White" },
      ],
      skuDetails: {
        fullDescription:
          "AI development framework with pre-built models, tools, and infrastructure for enterprise-scale AI solution deployment.",
        increments: "Monthly",
        minIncrements: 1,
        cost: "$4,500 per month",
      },
      orderItems: [
        { name: "AI Framework License", quantity: 1, cost: "$4,500/month" },
        { name: "Implementation Services", quantity: 1, cost: "$7,500" },
        { name: "Developer Training", quantity: 2, cost: "$2,000" },
      ],
    },

    // ORDERS - Mixed approval statuses
    {
      id: "ORD-2023-0042",
      name: "STAT Implementation - Global Banking",
      engagementCode: "GBFSI-2023-1234",
      country: "United States",
      skuNumber: "1001039-001-aaa",
      skuDescription: "Single Tenant Small/Medium",
      orderDate: new Date("2023-10-15T20:41:00-04:00"),
      commercialOwner: "Sarah Johnson",
      productApprovalRequired: true,
      engagementPartner: "Michael Chen",
      orderedBy: "Alex Johnson",
      stage: "order",
      // Approval information - mixed statuses
      approvals: [
        {
          type: "product",
          status: "approved",
          approver: "John Smith",
          email: "john.smith@ey.com",
          date: "2023-10-15",
          comments: "Approved as per policy",
        },
        { type: "deployment", status: "required", approver: "Technical Team", email: "tech.deploy@ey.com" },
        { type: "local_risk", status: "not_required" },
        { type: "global_risk", status: "not_required" },
        {
          type: "engagement",
          status: "approved",
          approver: "Michael Chen",
          email: "michael.chen@ey.com",
          date: "2023-10-12",
        },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-1234-5678",
      engagementTeam: [
        { role: "Engagement Partner", name: "Michael Chen" },
        { role: "Senior Manager", name: "Jessica Wong" },
        { role: "Manager", name: "David Smith" },
        { role: "Associate", name: "Robert Johnson" },
      ],
      skuDetails: {
        fullDescription:
          "The Single-Tenant Small/Medium solution provides dedicated infrastructure for organizations requiring enhanced security, customization options, and performance.",
        increments: "Monthly",
        minIncrements: 1,
        cost: "$2,000 per month",
      },
      orderItems: [
        { name: "STAT Implementation Services", quantity: 1, cost: "$5,000" },
        { name: "Single Tenant Small/Medium License", quantity: 1, cost: "$2,000/month" },
        { name: "Training Package", quantity: 1, cost: "$1,500" },
      ],
    },
    {
      id: "ORD-2023-0041",
      name: "Data Analytics Platform - Energy Corp",
      engagementCode: "ENERGY-2023-5678",
      country: "Canada",
      skuNumber: "1001039-002-bbb",
      skuDescription: "Multi Tenant Analytics",
      orderDate: new Date("2023-10-12T14:23:00-04:00"),
      commercialOwner: "David Williams",
      productApprovalRequired: true,
      engagementPartner: "Jennifer Lopez",
      orderedBy: "Emma Williams",
      stage: "order",
      // Approval information - mixed statuses
      approvals: [
        {
          type: "product",
          status: "rejected",
          approver: "Product Team",
          email: "product.review@ey.com",
          date: "2023-10-14",
          comments: "Does not meet requirements",
        },
        { type: "deployment", status: "required", approver: "Technical Team", email: "tech.deploy@ey.com" },
        {
          type: "local_risk",
          status: "approved",
          approver: "Risk Team",
          email: "risk.local@ca.ey.com",
          date: "2023-10-10",
        },
        { type: "global_risk", status: "required", approver: "Global Risk", email: "risk.global@ey.com" },
        { type: "engagement", status: "required", approver: "Jennifer Lopez", email: "jennifer.lopez@ey.com" },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-2345-6789",
      engagementTeam: [
        { role: "Engagement Partner", name: "Jennifer Lopez" },
        { role: "Senior Manager", name: "Thomas Brown" },
        { role: "Manager", name: "Sarah Miller" },
        { role: "Associate", name: "James Wilson" },
      ],
      skuDetails: {
        fullDescription:
          "Multi-tenant analytics platform with shared infrastructure and dedicated data isolation for cost-effective business intelligence.",
        increments: "Monthly",
        minIncrements: 5,
        cost: "$1,500 per month",
      },
      orderItems: [
        { name: "Analytics Platform Setup", quantity: 1, cost: "$3,500" },
        { name: "Multi Tenant License", quantity: 1, cost: "$1,500/month" },
        { name: "Data Migration Services", quantity: 1, cost: "$2,000" },
      ],
    },
    {
      id: "ORD-2023-0040",
      name: "Cloud Security Implementation",
      engagementCode: "TECH-2023-9012",
      country: "Germany",
      skuNumber: "1001039-003-ccc",
      skuDescription: "Cloud Security Services",
      orderDate: new Date("2023-10-08T09:15:00-04:00"),
      commercialOwner: "Robert Smith",
      productApprovalRequired: false,
      engagementPartner: "Anna Mueller",
      orderedBy: "Thomas Schmidt",
      stage: "order",
      // Approval information - mixed statuses
      approvals: [
        { type: "product", status: "not_required" },
        { type: "deployment", status: "not_required" },
        { type: "local_risk", status: "not_required" },
        { type: "global_risk", status: "not_required" },
        {
          type: "engagement",
          status: "approved",
          approver: "Anna Mueller",
          email: "anna.mueller@de.ey.com",
          date: "2023-10-08",
        },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-3456-7890",
      engagementTeam: [
        { role: "Engagement Partner", name: "Anna Mueller" },
        { role: "Senior Manager", name: "Hans Schmidt" },
        { role: "Manager", name: "Lukas Weber" },
        { role: "Associate", name: "Sophie Becker" },
      ],
      skuDetails: {
        fullDescription:
          "Comprehensive cloud security services including threat detection, compliance monitoring, and security posture management.",
        increments: "Monthly",
        minIncrements: 1,
        cost: "$3,000 per month",
      },
      orderItems: [
        { name: "Cloud Security Assessment", quantity: 1, cost: "$4,500" },
        { name: "Security Monitoring License", quantity: 1, cost: "$3,000/month" },
        { name: "Security Training", quantity: 1, cost: "$1,200" },
      ],
    },

    // PRODUCT SIDE APPROVED - All product approvals approved, engagement may be pending
    {
      id: "ORD-2023-0039",
      name: "AI Development Framework License",
      engagementCode: "TECH-2023-3456",
      country: "United Kingdom",
      skuNumber: "1001039-004-ddd",
      skuDescription: "AI Development Framework",
      orderDate: new Date("2023-10-05T16:37:00-04:00"),
      commercialOwner: "Emily Brown",
      productApprovalRequired: true,
      engagementPartner: "James Wilson",
      orderedBy: "Olivia Taylor",
      stage: "product_approved",
      // All product approvals approved, engagement pending
      approvals: [
        {
          type: "product",
          status: "approved",
          approver: "Product Team",
          email: "product.review@uk.ey.com",
          date: "2023-10-05",
        },
        {
          type: "deployment",
          status: "approved",
          approver: "Deployment Team",
          email: "tech.deploy@uk.ey.com",
          date: "2023-10-06",
        },
        {
          type: "local_risk",
          status: "approved",
          approver: "Local Risk",
          email: "risk.local@uk.ey.com",
          date: "2023-10-07",
        },
        {
          type: "global_risk",
          status: "approved",
          approver: "Global Risk",
          email: "risk.global@ey.com",
          date: "2023-10-08",
        },
        { type: "engagement", status: "required", approver: "James Wilson", email: "james.wilson@uk.ey.com" },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-4567-8901",
      engagementTeam: [
        { role: "Engagement Partner", name: "James Wilson" },
        { role: "Senior Manager", name: "Emma Thompson" },
        { role: "Manager", name: "Oliver Davis" },
        { role: "Associate", name: "Charlotte White" },
      ],
      skuDetails: {
        fullDescription:
          "AI development framework with pre-built models, tools, and infrastructure for enterprise-scale AI solution deployment.",
        increments: "Monthly",
        minIncrements: 1,
        cost: "$4,500 per month",
      },
      orderItems: [
        { name: "AI Framework License", quantity: 1, cost: "$4,500/month" },
        { name: "Implementation Services", quantity: 1, cost: "$7,500" },
        { name: "Developer Training", quantity: 2, cost: "$2,000" },
      ],
    },
    {
      id: "ORD-2023-0038",
      name: "Enterprise Integration Platform",
      engagementCode: "MANUF-2023-7890",
      country: "Japan",
      skuNumber: "1001039-005-eee",
      skuDescription: "Enterprise Integration Platform",
      orderDate: new Date("2023-09-30T11:52:00-04:00"),
      commercialOwner: "Thomas Lee",
      productApprovalRequired: true,
      engagementPartner: "Yuki Tanaka",
      orderedBy: "Hiroshi Yamamoto",
      stage: "product_approved",
      // All product approvals approved, engagement pending
      approvals: [
        {
          type: "product",
          status: "approved",
          approver: "Product Team",
          email: "product.review@ey.com",
          date: "2023-09-30",
        },
        {
          type: "deployment",
          status: "approved",
          approver: "Deployment Team",
          email: "tech.deploy@gds.ey.com",
          date: "2023-10-01",
        },
        {
          type: "local_risk",
          status: "approved",
          approver: "Local Risk",
          email: "risk.local@jp.ey.com",
          date: "2023-10-02",
        },
        {
          type: "global_risk",
          status: "approved",
          approver: "Global Risk",
          email: "risk.global@ey.com",
          date: "2023-10-03",
        },
        { type: "engagement", status: "required", approver: "Yuki Tanaka", email: "yuki.tanaka@jp.ey.com" },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-5678-9012",
      engagementTeam: [
        { role: "Engagement Partner", name: "Yuki Tanaka" },
        { role: "Senior Manager", name: "Hiroshi Yamamoto" },
        { role: "Manager", name: "Akiko Sato" },
        { role: "Associate", name: "Takashi Nakamura" },
      ],
      skuDetails: {
        fullDescription:
          "Enterprise integration platform for connecting applications, data sources, and business processes across the organization.",
        increments: "Monthly",
        minIncrements: 1,
        cost: "$3,500 per month",
      },
      orderItems: [
        { name: "Integration Platform License", quantity: 1, cost: "$3,500/month" },
        { name: "Connector Development", quantity: 5, cost: "$10,000" },
        { name: "System Integration Services", quantity: 1, cost: "$8,500" },
      ],
    },

    // ENGAGEMENT APPROVED - All approvals including engagement are approved
    {
      id: "ORD-2023-0037",
      name: "DevOps Automation Suite",
      engagementCode: "TECH-2023-1357",
      country: "Australia",
      skuNumber: "1001039-006-fff",
      skuDescription: "DevOps Automation Suite",
      orderDate: new Date("2023-09-28T13:19:00-04:00"),
      commercialOwner: "Sarah Johnson",
      productApprovalRequired: true,
      engagementPartner: "Robert Brown",
      orderedBy: "Sarah Parker",
      stage: "engagement_approved",
      // All approvals including engagement are approved
      approvals: [
        {
          type: "product",
          status: "approved",
          approver: "Product Team",
          email: "product.review@au.ey.com",
          date: "2023-09-28",
        },
        {
          type: "deployment",
          status: "approved",
          approver: "Deployment Team",
          email: "tech.deploy@au.ey.com",
          date: "2023-09-29",
        },
        {
          type: "local_risk",
          status: "approved",
          approver: "Local Risk",
          email: "risk.local@au.ey.com",
          date: "2023-09-30",
        },
        {
          type: "global_risk",
          status: "approved",
          approver: "Global Risk",
          email: "risk.global@ey.com",
          date: "2023-10-01",
        },
        {
          type: "engagement",
          status: "approved",
          approver: "Robert Brown",
          email: "robert.brown@au.ey.com",
          date: "2023-10-02",
        },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-6789-0123",
      engagementTeam: [
        { role: "Engagement Partner", name: "Robert Brown" },
        { role: "Senior Manager", name: "Michelle Parker" },
        { role: "Manager", name: "Andrew Wilson" },
        { role: "Associate", name: "Jessica Taylor" },
      ],
      skuDetails: {
        fullDescription:
          "DevOps automation suite for CI/CD pipelines, infrastructure as code, and automated testing and deployment.",
        increments: "Monthly",
        minIncrements: 1,
        cost: "$2,500 per month",
      },
      orderItems: [
        { name: "DevOps Suite License", quantity: 1, cost: "$2,500/month" },
        { name: "Pipeline Setup Services", quantity: 1, cost: "$6,000" },
        { name: "Team Training", quantity: 1, cost: "$3,000" },
      ],
    },
    {
      id: "ORD-2023-0036",
      name: "Blockchain Solutions Implementation",
      engagementCode: "FINTECH-2023-2468",
      country: "Singapore",
      skuNumber: "1001039-007-ggg",
      skuDescription: "Blockchain Solutions",
      orderDate: new Date("2023-09-25T10:05:00-04:00"),
      commercialOwner: "David Williams",
      productApprovalRequired: true,
      engagementPartner: "Li Wei",
      orderedBy: "Chen Jie",
      stage: "engagement_approved",
      // All approvals including engagement are approved
      approvals: [
        {
          type: "product",
          status: "approved",
          approver: "Product Team",
          email: "product.review@gds.ey.com",
          date: "2023-09-25",
        },
        {
          type: "deployment",
          status: "approved",
          approver: "Deployment Team",
          email: "tech.deploy@gds.ey.com",
          date: "2023-09-26",
        },
        {
          type: "local_risk",
          status: "approved",
          approver: "Local Risk Team",
          email: "risk.local@sg.ey.com",
          date: "2023-09-27",
        },
        {
          type: "global_risk",
          status: "approved",
          approver: "Global Risk Team",
          email: "risk.global@ey.com",
          date: "2023-09-28",
        },
        {
          type: "engagement",
          status: "approved",
          approver: "Li Wei",
          email: "li.wei@sg.ey.com",
          date: "2023-09-29",
        },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-7890-1234",
      engagementTeam: [
        { role: "Engagement Partner", name: "Li Wei" },
        { role: "Senior Manager", name: "Chen Jie" },
        { role: "Manager", name: "Tan Mei Ling" },
        { role: "Associate", name: "Wong Kai" },
      ],
      skuDetails: {
        fullDescription:
          "Blockchain solutions for secure, transparent, and immutable record-keeping and transaction processing.",
        increments: "Monthly",
        minIncrements: 1,
        cost: "$5,000 per month",
      },
      orderItems: [
        { name: "Blockchain Platform License", quantity: 1, cost: "$5,000/month" },
        { name: "Smart Contract Development", quantity: 3, cost: "$9,000" },
        { name: "Implementation Services", quantity: 1, cost: "$12,000" },
      ],
    },
  ]

  // Sample data for recoveries (billing)
  const sampleRecoveries = [
    {
      id: "REC-2023-0001",
      client: "Global Banking Corp",
      engagementCode: "GBFSI-2023-1234",
      amount: 7500,
      dateBilled: new Date("2023-10-15"),
      status: "Paid",
      invoiceNumber: "INV-2023-4567",
      paymentDate: new Date("2023-10-30"),
      skuNumber: "1001039-001-aaa",
      skuDescription: "Single Tenant Small/Medium",
      orderId: "ORD-2023-0042",
      expectedRecoveryDate: new Date("2023-11-15"),
      recoveryType: "License Fee",
      billingCycle: "One-time",
    },
    {
      id: "REC-2023-0002",
      client: "Energy Solutions Inc",
      engagementCode: "ENERGY-2023-5678",
      amount: 5000,
      dateBilled: new Date("2023-10-12"),
      status: "Pending",
      invoiceNumber: "INV-2023-4568",
      paymentDate: null,
      skuNumber: "1001039-002-bbb",
      skuDescription: "Multi Tenant Analytics",
      orderId: "ORD-2023-0041",
      expectedRecoveryDate: new Date("2023-11-12"),
      recoveryType: "Implementation",
      billingCycle: "One-time",
    },
    {
      id: "REC-2023-0003",
      client: "Tech Innovations GmbH",
      engagementCode: "TECH-2023-9012",
      amount: 8700,
      dateBilled: new Date("2023-10-08"),
      status: "Paid",
      invoiceNumber: "INV-2023-4569",
      paymentDate: new Date("2023-10-25"),
      skuNumber: "1001039-003-ccc",
      skuDescription: "Cloud Security Services",
      orderId: "ORD-2023-0040",
      expectedRecoveryDate: new Date("2023-10-25"),
      recoveryType: "License Fee",
      billingCycle: "Monthly",
    },
    {
      id: "REC-2023-0004",
      client: "Digital Futures UK",
      engagementCode: "TECH-2023-3456",
      amount: 12000,
      dateBilled: new Date("2023-09-30"),
      status: "Overdue",
      invoiceNumber: "INV-2023-4570",
      paymentDate: null,
      skuNumber: "1001039-004-ddd",
      skuDescription: "AI Development Framework",
      orderId: "ORD-2023-0039",
      expectedRecoveryDate: new Date("2023-10-30"),
      recoveryType: "License Fee",
      billingCycle: "Annual",
    },
    {
      id: "REC-2023-0005",
      client: "Manufacturing Solutions Japan",
      engagementCode: "MANUF-2023-7890",
      amount: 22000,
      dateBilled: new Date("2023-09-25"),
      status: "Paid",
      invoiceNumber: "INV-2023-4571",
      paymentDate: new Date("2023-10-10"),
      skuNumber: "1001039-005-eee",
      skuDescription: "Enterprise Integration Platform",
      orderId: "ORD-2023-0038",
      expectedRecoveryDate: new Date("2023-10-10"),
      recoveryType: "Implementation",
      billingCycle: "One-time",
    },
    {
      id: "REC-2023-0006",
      client: "TechOps Australia",
      engagementCode: "TECH-2023-1357",
      amount: 11500,
      dateBilled: new Date("2023-09-20"),
      status: "Paid",
      invoiceNumber: "INV-2023-4572",
      paymentDate: new Date("2023-10-05"),
      skuNumber: "1001039-006-fff",
      skuDescription: "DevOps Automation Suite",
      orderId: "ORD-2023-0037",
      expectedRecoveryDate: new Date("2023-10-05"),
      recoveryType: "License Fee",
      billingCycle: "Quarterly",
    },
    {
      id: "REC-2023-0007",
      client: "FinTech Singapore",
      engagementCode: "FINTECH-2023-2468",
      amount: 26000,
      dateBilled: new Date("2023-09-15"),
      status: "Paid",
      invoiceNumber: "INV-2023-4573",
      paymentDate: new Date("2023-09-30"),
      skuNumber: "1001039-007-ggg",
      skuDescription: "Blockchain Solutions",
      orderId: "ORD-2023-0036",
      expectedRecoveryDate: new Date("2023-09-30"),
      recoveryType: "Implementation",
      billingCycle: "One-time",
    },
    // Additional data for current year
    {
      id: "REC-2023-0008",
      client: "Healthcare Systems Inc",
      engagementCode: "HEALTH-2023-3579",
      amount: 18500,
      dateBilled: new Date("2023-08-10"),
      status: "Paid",
      invoiceNumber: "INV-2023-4574",
      paymentDate: new Date("2023-08-25"),
      skuNumber: "1001039-008-hhh",
      skuDescription: "Patient Management System",
      orderId: "ORD-2023-0035",
      expectedRecoveryDate: new Date("2023-08-25"),
      recoveryType: "License Fee",
      billingCycle: "Annual",
    },
    {
      id: "REC-2023-0009",
      client: "Retail Solutions Corp",
      engagementCode: "RETAIL-2023-4680",
      amount: 9200,
      dateBilled: new Date("2023-07-22"),
      status: "Paid",
      invoiceNumber: "INV-2023-4575",
      paymentDate: new Date("2023-08-05"),
      skuNumber: "1001039-009-iii",
      skuDescription: "Inventory Management System",
      orderId: "ORD-2023-0034",
      expectedRecoveryDate: new Date("2023-08-05"),
      recoveryType: "Implementation",
      billingCycle: "One-time",
    },
    {
      id: "REC-2023-0010",
      client: "Insurance Group USA",
      engagementCode: "INSUR-2023-5791",
      amount: 31000,
      dateBilled: new Date("2023-06-15"),
      status: "Paid",
      invoiceNumber: "INV-2023-4576",
      paymentDate: new Date("2023-07-01"),
      skuNumber: "1001039-010-jjj",
      skuDescription: "Claims Processing System",
      orderId: "ORD-2023-0033",
      expectedRecoveryDate: new Date("2023-07-01"),
      recoveryType: "License Fee",
      billingCycle: "Annual",
    },
    {
      id: "REC-2023-0011",
      client: "Education Tech Ltd",
      engagementCode: "EDU-2023-6802",
      amount: 14500,
      dateBilled: new Date("2023-05-20"),
      status: "Paid",
      invoiceNumber: "INV-2023-4577",
      paymentDate: new Date("2023-06-05"),
      skuNumber: "1001039-011-kkk",
      skuDescription: "Learning Management System",
      orderId: "ORD-2023-0032",
      expectedRecoveryDate: new Date("2023-06-05"),
      recoveryType: "Implementation",
      billingCycle: "One-time",
    },
    {
      id: "REC-2023-0012",
      client: "Government Services",
      engagementCode: "GOV-2023-7913",
      amount: 42000,
      dateBilled: new Date("2023-04-10"),
      status: "Paid",
      invoiceNumber: "INV-2023-4578",
      paymentDate: new Date("2023-04-25"),
      skuNumber: "1001039-012-lll",
      skuDescription: "Citizen Services Portal",
      orderId: "ORD-2023-0031",
      expectedRecoveryDate: new Date("2023-04-25"),
      recoveryType: "License Fee",
      billingCycle: "Annual",
    },
    {
      id: "REC-2023-0013",
      client: "Telecom Solutions",
      engagementCode: "TELCO-2023-8024",
      amount: 28500,
      dateBilled: new Date("2023-03-15"),
      status: "Paid",
      invoiceNumber: "INV-2023-4579",
      paymentDate: new Date("2023-03-30"),
      skuNumber: "1001039-013-mmm",
      skuDescription: "Network Management System",
      orderId: "ORD-2023-0030",
      expectedRecoveryDate: new Date("2023-03-30"),
      recoveryType: "Implementation",
      billingCycle: "One-time",
    },
    {
      id: "REC-2023-0014",
      client: "Automotive Industries",
      engagementCode: "AUTO-2023-9135",
      amount: 19800,
      dateBilled: new Date("2023-02-20"),
      status: "Paid",
      invoiceNumber: "INV-2023-4580",
      paymentDate: new Date("2023-03-05"),
      skuNumber: "1001039-014-nnn",
      skuDescription: "Supply Chain Management",
      orderId: "ORD-2023-0029",
      expectedRecoveryDate: new Date("2023-03-05"),
      recoveryType: "License Fee",
      billingCycle: "Quarterly",
    },
    {
      id: "REC-2023-0015",
      client: "Media Group International",
      engagementCode: "MEDIA-2023-0246",
      amount: 23500,
      dateBilled: new Date("2023-01-15"),
      status: "Paid",
      invoiceNumber: "INV-2023-4581",
      paymentDate: new Date("2023-01-30"),
      skuNumber: "1001039-015-ooo",
      skuDescription: "Content Management System",
      orderId: "ORD-2023-0028",
      expectedRecoveryDate: new Date("2023-01-30"),
      recoveryType: "Implementation",
      billingCycle: "One-time",
    },
    {
      id: "REC-2023-0016",
      client: "New Client 1",
      engagementCode: "NEW-2023-0001",
      amount: 10000,
      dateBilled: new Date("2023-11-01"),
      status: "Pending",
      invoiceNumber: "INV-2023-4582",
      paymentDate: null,
      skuNumber: "1001039-016-ppp",
      skuDescription: "New Service 1",
      orderId: "ORD-2023-0043",
      expectedRecoveryDate: new Date("2023-12-01"),
      recoveryType: "Implementation",
      billingCycle: "One-time",
    },
    {
      id: "REC-2023-0017",
      client: "New Client 2",
      engagementCode: "NEW-2023-0002",
      amount: 15000,
      dateBilled: new Date("2023-11-15"),
      status: "Overdue",
      invoiceNumber: "INV-2023-4583",
      paymentDate: null,
      skuNumber: "1001039-017-qqq",
      skuDescription: "New Service 2",
      orderId: "ORD-2023-0044",
      expectedRecoveryDate: new Date("2023-12-15"),
      recoveryType: "License Fee",
      billingCycle: "Annual",
    },
    {
      id: "REC-2023-0018",
      client: "Global Financial Services",
      engagementCode: "FINSERV-2023-0003",
      amount: 18500,
      dateBilled: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
      status: "Pending",
      invoiceNumber: "INV-2023-4584",
      paymentDate: null,
      skuNumber: "1001039-018-rrr",
      skuDescription: "Financial Analytics Platform",
      orderId: "ORD-2023-0045",
      expectedRecoveryDate: new Date(new Date().setDate(new Date().getDate() + 25)), // 25 days in future
      recoveryType: "License Fee",
      billingCycle: "Annual",
    },
    {
      id: "REC-2023-0019",
      client: "Healthcare Innovations Inc",
      engagementCode: "HEALTH-2023-0004",
      amount: 12750,
      dateBilled: new Date(new Date().setDate(new Date().getDate() - 7)), // 7 days ago
      status: "Paid",
      invoiceNumber: "INV-2023-4585",
      paymentDate: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
      skuNumber: "1001039-019-sss",
      skuDescription: "Patient Data Management System",
      orderId: "ORD-2023-0046",
      expectedRecoveryDate: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
      recoveryType: "Implementation",
      billingCycle: "One-time",
    },
    {
      id: "REC-2023-0020",
      client: "Manufacturing Excellence Corp",
      engagementCode: "MANUF-2023-0005",
      amount: 9800,
      dateBilled: new Date(new Date().setDate(new Date().getDate() - 10)), // 10 days ago
      status: "Overdue",
      invoiceNumber: "INV-2023-4586",
      paymentDate: null,
      skuNumber: "1001039-020-ttt",
      skuDescription: "Supply Chain Optimization Tool",
      orderId: "ORD-2023-0047",
      expectedRecoveryDate: new Date(new Date().setDate(new Date().getDate() + 15)), // 15 days in future
      recoveryType: "License Fee",
      billingCycle: "Quarterly",
    },
    {
      id: "REC-2023-0021",
      client: "Retail Innovations Group",
      engagementCode: "RETAIL-2023-0006",
      amount: 15300,
      dateBilled: new Date(new Date().setDate(new Date().getDate() - 12)), // 12 days ago
      status: "Paid",
      invoiceNumber: "INV-2023-4587",
      paymentDate: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
      skuNumber: "1001039-021-uuu",
      skuDescription: "Customer Analytics Platform",
      orderId: "ORD-2023-0048",
      expectedRecoveryDate: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
      recoveryType: "Implementation",
      billingCycle: "One-time",
    },
    {
      id: "REC-2023-0022",
      client: "Energy Solutions Global",
      engagementCode: "ENERGY-2023-0007",
      amount: 22500,
      dateBilled: new Date(new Date().setDate(new Date().getDate() - 15)), // 15 days ago
      status: "Pending",
      invoiceNumber: "INV-2023-4588",
      paymentDate: null,
      skuNumber: "1001039-022-vvv",
      skuDescription: "Energy Management System",
      orderId: "ORD-2023-0049",
      expectedRecoveryDate: new Date(new Date().setDate(new Date().getDate() + 20)), // 20 days in future
      recoveryType: "License Fee",
      billingCycle: "Annual",
    },
  ]

  // Sample data for returns (refunds)
  const sampleReturns = [
    {
      id: "RET-2023-0001",
      client: "Global Banking Corp",
      engagementCode: "GBFSI-2023-1234",
      amount: 1500,
      dateRequested: new Date("2023-10-20"),
      status: "Approved",
      reason: "Service not used",
      processingDate: new Date("2023-10-25"),
      skuNumber: "1001039-001-aaa",
      skuDescription: "Single Tenant Small/Medium - Training Component",
      orderId: "ORD-2023-0042",
      approvedBy: "Sarah Johnson",
      expectedReturnDate: new Date("2023-11-10"),
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4567",
    },
    {
      id: "RET-2023-0002",
      client: "Energy Solutions Inc",
      engagementCode: "ENERGY-2023-5678",
      amount: 2000,
      dateRequested: new Date("2023-10-18"),
      status: "Pending",
      reason: "Duplicate charge",
      processingDate: null,
      skuNumber: "1001039-002-bbb",
      skuDescription: "Data Migration Services",
      orderId: "ORD-2023-0041",
      approvedBy: null,
      expectedReturnDate: new Date("2023-11-15"),
      returnType: "Full Refund",
      originalInvoice: "INV-2023-4568",
    },
    {
      id: "RET-2023-0003",
      client: "Tech Innovations GmbH",
      engagementCode: "TECH-2023-9012",
      amount: 1200,
      dateRequested: new Date("2023-10-10"),
      status: "Rejected",
      reason: "Outside refund window",
      processingDate: new Date("2023-10-12"),
      skuNumber: "1001039-003-ccc",
      skuDescription: "Security Training",
      orderId: "ORD-2023-0040",
      approvedBy: "Robert Smith",
      expectedReturnDate: null,
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4569",
    },
    {
      id: "RET-2023-0004",
      client: "Digital Futures UK",
      engagementCode: "TECH-2023-3456",
      amount: 7500,
      dateRequested: new Date("2023-10-05"),
      status: "Approved",
      reason: "Service level not met",
      processingDate: new Date("2023-10-10"),
      skuNumber: "1001039-004-ddd",
      skuDescription: "Implementation Services",
      orderId: "ORD-2023-0039",
      approvedBy: "Emily Brown",
      expectedReturnDate: new Date("2023-10-25"),
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4570",
    },
    {
      id: "RET-2023-0005",
      client: "Manufacturing Solutions Japan",
      engagementCode: "MANUF-2023-7890",
      amount: 5000,
      dateRequested: new Date("2023-09-28"),
      status: "Pending",
      reason: "Scope change",
      processingDate: null,
      skuNumber: "1001039-005-eee",
      skuDescription: "Connector Development (2 units)",
      orderId: "ORD-2023-0038",
      approvedBy: null,
      expectedReturnDate: new Date("2023-10-30"),
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4571",
    },
    // Additional data for current year
    {
      id: "RET-2023-0006",
      client: "TechOps Australia",
      engagementCode: "TECH-2023-1357",
      amount: 3000,
      dateRequested: new Date("2023-08-15"),
      status: "Approved",
      reason: "Training not delivered",
      processingDate: new Date("2023-08-20"),
      skuNumber: "1001039-006-fff",
      skuDescription: "Team Training",
      orderId: "ORD-2023-0037",
      approvedBy: "Sarah Johnson",
      expectedReturnDate: new Date("2023-09-05"),
      returnType: "Full Refund",
      originalInvoice: "INV-2023-4572",
    },
    {
      id: "RET-2023-0007",
      client: "FinTech Singapore",
      engagementCode: "FINTECH-2023-2468",
      amount: 9000,
      dateRequested: new Date("2023-07-10"),
      status: "Approved",
      reason: "Contract termination",
      processingDate: new Date("2023-07-15"),
      skuNumber: "1001039-007-ggg",
      skuDescription: "Smart Contract Development",
      orderId: "ORD-2023-0036",
      approvedBy: "David Williams",
      expectedReturnDate: new Date("2023-08-01"),
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4573",
    },
    {
      id: "RET-2023-0008",
      client: "Healthcare Systems Inc",
      engagementCode: "HEALTH-2023-3579",
      amount: 4500,
      dateRequested: new Date("2023-06-20"),
      status: "Approved",
      reason: "Module not implemented",
      processingDate: new Date("2023-06-25"),
      skuNumber: "1001039-008-hhh",
      skuDescription: "Patient Management System - Analytics Module",
      orderId: "ORD-2023-0035",
      approvedBy: "Robert Brown",
      expectedReturnDate: new Date("2023-07-15"),
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4574",
    },
    {
      id: "RET-2023-0009",
      client: "Retail Solutions Corp",
      engagementCode: "RETAIL-2023-4680",
      amount: 2200,
      dateRequested: new Date("2023-05-12"),
      status: "Rejected",
      reason: "Service already delivered",
      processingDate: new Date("2023-05-15"),
      skuNumber: "1001039-009-iii",
      skuDescription: "Inventory Management System - Training",
      orderId: "ORD-2023-0034",
      approvedBy: "Emily Brown",
      expectedReturnDate: null,
      returnType: "Full Refund",
      originalInvoice: "INV-2023-4575",
    },
    {
      id: "RET-2023-0010",
      client: "Insurance Group USA",
      engagementCode: "INSUR-2023-5791",
      amount: 8000,
      dateRequested: new Date("2023-04-05"),
      status: "Approved",
      reason: "Downgrade to lower tier",
      processingDate: new Date("2023-04-10"),
      skuNumber: "1001039-010-jjj",
      skuDescription: "Claims Processing System - Premium Tier",
      orderId: "ORD-2023-0033",
      approvedBy: "Sarah Johnson",
      expectedReturnDate: new Date("2023-04-30"),
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4576",
    },
    {
      id: "RET-2023-0011",
      client: "Education Tech Ltd",
      engagementCode: "EDU-2023-6802",
      amount: 3500,
      dateRequested: new Date("2023-03-18"),
      status: "Approved",
      reason: "Implementation delayed",
      processingDate: new Date("2023-03-22"),
      skuNumber: "1001039-011-kkk",
      skuDescription: "Learning Management System - Mobile Module",
      orderId: "ORD-2023-0032",
      approvedBy: "David Williams",
      expectedReturnDate: new Date("2023-04-15"),
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4577",
    },
    {
      id: "RET-2023-0012",
      client: "Government Services",
      engagementCode: "GOV-2023-7913",
      amount: 12000,
      dateRequested: new Date("2023-02-10"),
      status: "Approved",
      reason: "Budget reallocation",
      processingDate: new Date("2023-02-15"),
      skuNumber: "1001039-012-lll",
      skuDescription: "Citizen Services Portal - Advanced Analytics",
      orderId: "ORD-2023-0031",
      approvedBy: "Robert Brown",
      expectedReturnDate: new Date("2023-03-05"),
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4578",
    },
    {
      id: "RET-2023-0013",
      client: "Telecom Solutions",
      engagementCode: "TELCO-2023-8024",
      amount: 6500,
      dateRequested: new Date("2023-01-25"),
      status: "Approved",
      reason: "Service not required",
      processingDate: new Date("2023-01-30"),
      skuNumber: "1001039-013-mmm",
      skuDescription: "Network Management System - Monitoring Module",
      orderId: "ORD-2023-0030",
      approvedBy: "Emily Brown",
      expectedReturnDate: new Date("2023-02-20"),
      returnType: "Full Refund",
      originalInvoice: "INV-2023-4579",
    },
    {
      id: "RET-2023-0014",
      client: "New Client 1",
      engagementCode: "NEW-2023-0001",
      amount: 2500,
      dateRequested: new Date("2023-11-01"),
      status: "Pending",
      reason: "Implementation issues",
      processingDate: null,
      skuNumber: "1001039-014-nnn",
      skuDescription: "New Service 1 - Basic Package",
      orderId: "ORD-2023-0043",
      approvedBy: null,
      expectedReturnDate: new Date("2023-11-15"),
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4582",
    },
    {
      id: "RET-2023-0015",
      client: "New Client 2",
      engagementCode: "NEW-2023-0002",
      amount: 1800,
      dateRequested: new Date("2023-11-15"),
      status: "Approved",
      reason: "Contract cancellation",
      processingDate: new Date("2023-11-20"),
      skuNumber: "1001039-015-ooo",
      skuDescription: "New Service 2 - Standard License",
      orderId: "ORD-2023-0044",
      approvedBy: "Robert Smith",
      expectedReturnDate: new Date("2023-12-01"),
      returnType: "Full Refund",
      originalInvoice: "INV-2023-4583",
    },
    {
      id: "RET-2023-0016",
      client: "Global Financial Services",
      engagementCode: "FINSERV-2023-0003",
      amount: 4500,
      dateRequested: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
      status: "Pending",
      reason: "Service level not met",
      processingDate: null,
      skuNumber: "1001039-018-rrr",
      skuDescription: "Financial Analytics Platform - Advanced Module",
      orderId: "ORD-2023-0045",
      approvedBy: null,
      expectedReturnDate: new Date(new Date().setDate(new Date().getDate() + 20)), // 20 days in future
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4584",
    },
    {
      id: "RET-2023-0017",
      client: "Healthcare Innovations Inc",
      engagementCode: "HEALTH-2023-0004",
      amount: 3200,
      dateRequested: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
      status: "Approved",
      reason: "Unused services",
      processingDate: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
      skuNumber: "1001039-019-sss",
      skuDescription: "Patient Data Management System - Training",
      orderId: "ORD-2023-0046",
      approvedBy: "Sarah Johnson",
      expectedReturnDate: new Date(new Date().setDate(new Date().getDate() + 15)), // 15 days in future
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4585",
    },
    {
      id: "RET-2023-0018",
      client: "Manufacturing Excellence Corp",
      engagementCode: "MANUF-2023-0005",
      amount: 9800,
      dateRequested: new Date(new Date().setDate(new Date().getDate() - 7)), // 7 days ago
      status: "Rejected",
      reason: "Outside contract terms",
      processingDate: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
      skuNumber: "1001039-020-ttt",
      skuDescription: "Supply Chain Optimization Tool",
      orderId: "ORD-2023-0047",
      approvedBy: "Robert Smith",
      expectedReturnDate: null,
      returnType: "Full Refund",
      originalInvoice: "INV-2023-4586",
    },
    {
      id: "RET-2023-0019",
      client: "Retail Innovations Group",
      engagementCode: "RETAIL-2023-0006",
      amount: 4200,
      dateRequested: new Date(new Date().setDate(new Date().getDate() - 10)), // 10 days ago
      status: "Approved",
      reason: "Partial implementation only",
      processingDate: new Date(new Date().setDate(new Date().getDate() - 7)), // 7 days ago
      skuNumber: "1001039-021-uuu",
      skuDescription: "Customer Analytics Platform - Data Migration",
      orderId: "ORD-2023-0048",
      approvedBy: "Emily Brown",
      expectedReturnDate: new Date(new Date().setDate(new Date().getDate() + 10)), // 10 days in future
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4587",
    },
    {
      id: "RET-2023-0020",
      client: "Energy Solutions Global",
      engagementCode: "ENERGY-2023-0007",
      amount: 7500,
      dateRequested: new Date(new Date().setDate(new Date().getDate() - 15)), // 15 days ago
      status: "Pending",
      reason: "Change in requirements",
      processingDate: null,
      skuNumber: "1001039-022-vvv",
      skuDescription: "Energy Management System - Premium Features",
      orderId: "ORD-2023-0049",
      approvedBy: null,
      expectedReturnDate: new Date(new Date().setDate(new Date().getDate() + 15)), // 15 days in future
      returnType: "Partial Refund",
      originalInvoice: "INV-2023-4588",
    },
  ]

  const [activeStep, setActiveStep] = useState(0)
  const [sortField, setSortField] = useState("id")
  const [sortDirection, setSortDirection] = useState("desc")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [timePeriod, setTimePeriod] = useState("running-year")
  const [recoverySort, setRecoverySort] = useState({ field: "dateBilled", direction: "desc" })
  const [returnSort, setReturnSort] = useState({ field: "dateRequested", direction: "desc" })

  // Track expanded rows
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [expandedSkuId, setExpandedSkuId] = useState<string | null>(null)
  const [expandedEngagementId, setExpandedEngagementId] = useState<string | null>(null)

  // Track active approval popup
  const [activeApprovalPopup, setActiveApprovalPopup] = useState<{
    orderId: string
    approvalType: string
  } | null>(null)

  // First, let's add a new state for the toggle between "Upcoming" and "Billed"
  // Add this near the other state declarations (around line 1000)
  const [recoveryView, setRecoveryView] = useState<"billed" | "upcoming">("billed")

  const steps = [
    { id: 0, name: "Drafts", icon: FileText },
    { id: 1, name: "Estimates", icon: Calculator },
    { id: 2, name: "Orders", icon: ShoppingBag },
    { id: 3, name: "Product Side Approved", icon: CheckCircle },
    { id: 4, name: "Engagement Approved", icon: CheckSquare },
    { id: 5, name: "Cancelled Orders", icon: XCircle },
    { id: 6, name: "Past Orders", icon: Archive },
    { id: 7, name: "Recoveries", icon: Download },
    { id: 8, name: "Returns", icon: RefreshCw },
  ]

  // Helper function to check if all product-related approvals are approved
  const allProductApprovalsApproved = (approvals: Approval[]) => {
    const productApprovals = approvals.filter(
      (approval) =>
        approval.type === "product" ||
        approval.type === "deployment" ||
        approval.type === "local_risk" ||
        approval.type === "global_risk",
    )

    // Check if all product approvals are either approved or not required
    return productApprovals.every((approval) => approval.status === "approved" || approval.status === "not_required")
  }

  // Helper function to check if engagement approval is approved
  const isEngagementApproved = (approvals: Approval[]) => {
    const engagementApproval = approvals.find((approval) => approval.type === "engagement")
    return engagementApproval && engagementApproval.status === "approved"
  }

  // Also, let's update the filterByTimePeriod function to handle the new time periods
  // Find the filterByTimePeriod function (around line 1100) and replace it with:

  // Helper function to filter by time period
  const filterByTimePeriod = (date: Date, period: string): boolean => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfQuarter = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
    const startOfYear = new Date(now.getFullYear(), 0, 1)

    // Calculate fiscal year end (assuming June 30)
    const fiscalYearEnd = new Date(now.getFullYear(), 5, 30)
    if (now > fiscalYearEnd) {
      fiscalYearEnd.setFullYear(fiscalYearEnd.getFullYear() + 1)
    }

    switch (period) {
      case "month":
        // Current month only
        return date >= startOfMonth && date <= now
      case "running-month":
        // Last 30 days
        const thirtyDaysAgo = new Date(now)
        thirtyDaysAgo.setDate(now.getDate() - 30)
        return date >= thirtyDaysAgo && date <= now
      case "next-30-days":
        // Next 30 days
        const thirtyDaysAhead = new Date(now)
        thirtyDaysAhead.setDate(now.getDate() + 30)
        return date >= now && date <= thirtyDaysAhead
      case "quarter":
        // Current quarter
        return date >= startOfQuarter && date <= now
      case "ytd":
        // Year to date
        return date >= startOfYear && date <= now
      case "rest-of-fy":
        // Rest of fiscal year
        return date >= now && date <= fiscalYearEnd
      case "running-year":
        // Last 365 days
        const yearAgo = new Date(now)
        yearAgo.setFullYear(now.getFullYear() - 1)
        return date >= yearAgo && date <= now
      default:
        return true
    }
  }

  // Filter recoveries based on time period
  const filteredRecoveries = sampleRecoveries
    .filter((recovery) => filterByTimePeriod(recovery.dateBilled, timePeriod))
    .sort((a, b) => {
      const fieldA = a[recoverySort.field as keyof typeof a]
      const fieldB = b[recoverySort.field as keyof typeof a]

      if (fieldA instanceof Date && fieldB instanceof Date) {
        return recoverySort.direction === "asc"
          ? fieldA.getTime() - fieldB.getTime()
          : fieldB.getTime() - fieldA.getTime()
      }

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return recoverySort.direction === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
      }

      if (typeof fieldA === "number" && typeof fieldB === "number") {
        return recoverySort.direction === "asc" ? fieldA - fieldB : fieldB - fieldA
      }

      return 0
    })

  // Filter returns based on time period
  const filteredReturns = sampleReturns
    .filter((returnItem) => filterByTimePeriod(returnItem.dateRequested, timePeriod))
    .sort((a, b) => {
      const fieldA = a[returnSort.field as keyof typeof a]
      const fieldB = b[returnSort.field as keyof typeof a]

      if (fieldA instanceof Date && fieldB instanceof Date) {
        return returnSort.direction === "asc"
          ? fieldA.getTime() - fieldB.getTime()
          : fieldB.getTime() - fieldA.getTime()
      }

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return returnSort.direction === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
      }

      if (typeof fieldA === "number" && typeof fieldB === "number") {
        return returnSort.direction === "asc" ? fieldA - fieldB : fieldB - fieldA
      }

      return 0
    })

  // Calculate totals
  const totalRecoveries =
    filteredRecoveries.length > 0 ? filteredRecoveries.reduce((sum, item) => sum + item.amount, 0) : 5000 // Sample amount when no results are found

  const totalReturns = filteredReturns.length > 0 ? filteredReturns.reduce((sum, item) => sum + item.amount, 0) : 3500 // Sample amount when no results are found

  // Handle sort for recoveries
  const handleRecoverySort = (field: string) => {
    setRecoverySort({
      field,
      direction: recoverySort.field === field && recoverySort.direction === "asc" ? "desc" : "asc",
    })
  }

  // Handle sort for returns
  const handleReturnSort = (field: string) => {
    setReturnSort({
      field,
      direction: returnSort.field === field && returnSort.direction === "asc" ? "desc" : "asc",
    })
  }

  // Filter orders based on search query and active step
  const filteredOrders = sampleOrders.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      Object.values(order).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
      )

    // Apply different filters based on active step
    switch (activeStep) {
      case 0: // Drafts
        return matchesSearch && order.stage === "draft"
      case 1: // Estimates
        return matchesSearch && order.stage === "estimate"
      case 2: // Orders
        return matchesSearch && order.stage === "order"
      case 3: // Product Side Approved
        return matchesSearch && order.stage === "product_approved" && allProductApprovalsApproved(order.approvals)
      case 4: // Engagement Approved
        return matchesSearch && order.stage === "engagement_approved" && isEngagementApproved(order.approvals)
      case 5: // Cancelled Orders
        return false // No cancelled orders in our sample data
      case 6: // Past Orders
        return false // No past orders in our sample data
      case 7: // Recoveries - we'll handle this separately
      case 8: // Returns - we'll handle this separately
        return false
      default:
        return matchesSearch
    }
  })

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const fieldA = a[sortField as keyof typeof a]
    const fieldB = b[sortField as keyof typeof a]

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
    }

    if (typeof fieldA === "boolean" && typeof fieldB === "boolean") {
      return sortDirection === "asc" ? Number(fieldA) - Number(fieldB) : Number(fieldB) - Number(fieldA)
    }

    if (fieldA instanceof Date && fieldB instanceof Date) {
      return sortDirection === "asc" ? fieldA.getTime() - fieldB.getTime() : fieldB.getTime() - fieldA.getTime()
    }

    return 0
  })

  // Handle sort click
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedOrders.length === sortedOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(sortedOrders.map((order) => order.id))
    }
  }

  // Handle select one
  const handleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  // Toggle expanded order details
  const toggleOrderDetails = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id)
    // Close other expanded sections when opening a new one
    if (expandedOrderId !== id) {
      setExpandedSkuId(null)
      setExpandedEngagementId(null)
      setActiveApprovalPopup(null)
    }
  }

  // Toggle expanded SKU details
  const toggleSkuDetails = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the row click
    setExpandedSkuId(expandedSkuId === id ? null : id)
    // Close other expanded sections when opening a new one
    if (expandedSkuId !== id) {
      setExpandedOrderId(null)
      setExpandedEngagementId(null)
      setActiveApprovalPopup(null)
    }
  }

  // Toggle expanded engagement details
  const toggleEngagementDetails = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the row click
    setExpandedEngagementId(expandedEngagementId === id ? null : id)
    // Close other expanded sections when opening a new one
    if (expandedEngagementId !== id) {
      setExpandedOrderId(null)
      setExpandedSkuId(null)
      setActiveApprovalPopup(null)
    }
  }

  // Toggle approval popup
  const toggleApprovalPopup = (orderId: string, approvalType: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the row click

    if (
      activeApprovalPopup &&
      activeApprovalPopup.orderId === orderId &&
      activeApprovalPopup.approvalType === approvalType
    ) {
      setActiveApprovalPopup(null) // Close if already open
    } else {
      setActiveApprovalPopup({ orderId, approvalType }) // Open the clicked one
      // Close other expanded sections when opening a new one
      setExpandedOrderId(null)
      setExpandedSkuId(null)
      setExpandedEngagementId(null)
    }
  }

  // Render approval button
  const getStepFiltersComponent = () => {
    switch (activeStep) {
      case 0: // Drafts
        return (
          <div className="flex space-x-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Created By</label>
              <select className="bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white w-40">
                <option value="">All Users</option>
                <option value="me">My Drafts</option>
                <option value="team">My Team</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Draft Age</label>
              <select className="bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white w-40">
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        )
      case 2: // Orders
        return (
          <div className="flex space-x-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Order Status</label>
              <select className="bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white w-40">
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="awaiting">Awaiting Approval</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Order Date</label>
              <select className="bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white w-40">
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Region</label>
              <select className="bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white w-40">
                <option value="">All Regions</option>
                <option value="americas">Americas</option>
                <option value="emeia">EMEIA</option>
                <option value="apac">Asia-Pacific</option>
              </select>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Helper function to render approval status icon
  const renderApprovalStatus = (status: ApprovalStatus) => {
    switch (status) {
      case "approved":
        return <Check className="h-4 w-4" />
      case "rejected":
        return <X className="h-4 w-4" />
      case "required":
        return <Clock className="h-4 w-4" />
      case "not_required":
      default:
        return null
    }
  }

  // Get approval by type
  const getApprovalByType = (approvals: Approval[], type: string) => {
    return approvals.find((approval) => approval.type === type)
  }

  // Get approval button color
  const getApprovalButtonColor = (status: ApprovalStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-600 hover:bg-green-700"
      case "rejected":
        return "bg-red-600 hover:bg-red-700"
      case "required":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "not_required":
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  // Render approval button
  const renderApprovalButton = (order: any, type: string, label: string) => {
    const approval = getApprovalByType(order.approvals, type)
    const orderId = order.id
    const approvalType = type

    if (!approval || approval.status === "not_required") {
      return null
    }

    const isActive =
      activeApprovalPopup &&
      activeApprovalPopup.orderId === orderId &&
      activeApprovalPopup.approvalType === approvalType

    return (
      <div className="relative">
        <button
          className={`px-2 py-1 rounded text-xs text-white flex items-center space-x-1 ${getApprovalButtonColor(approval.status)} ${isActive ? "ring-2 ring-white" : ""}`}
          onClick={(e) => toggleApprovalPopup(orderId, type, e)}
        >
          <span>{label}</span>
          {renderApprovalStatus(approval.status)}
        </button>

        {isActive && approval.approver && (
          <div className="absolute z-10 mt-1 bg-gray-900 border border-gray-700 rounded-md shadow-lg p-3 w-64">
            <div className="flex items-center mb-2">
              <Mail className="h-4 w-4 text-yellow-300 mr-2" />
              <span className="text-sm font-medium text-white">{approval.approver}</span>
            </div>
            {approval.email && <div className="text-xs text-gray-300 mb-2 break-all">{approval.email}</div>}
            {approval.date && (
              <div className="text-xs text-gray-400">
                {approval.status === "approved" ? "Approved" : approval.status === "rejected" ? "Rejected" : "Required"}{" "}
                on {approval.date}
              </div>
            )}
            {approval.comments && (
              <div className="mt-2 text-xs text-gray-300 border-t border-gray-700 pt-2">{approval.comments}</div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#0a0a14]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <TopNavbar />
        <main className="flex-1">
          {/* Order Pipeline Navigation */}
          <div className="bg-[#1a1a2e] py-8 px-6 border-b border-gray-800">
            <h1 className="text-3xl font-bold text-white mb-8">Order Pipeline</h1>

            <div className="overflow-x-auto">
              <div className="flex min-w-max">
                {steps.map((step, index) => {
                  const StepIcon = step.icon
                  const isFinancialSection = step.id >= 7 // Recoveries and Returns
                  const isFirstFinancial = step.id === 7 // Recoveries

                  return (
                    <div key={step.id} className="flex items-center">
                      {/* Add margin to first financial section item */}
                      {isFirstFinancial && <div className="w-24"></div>}

                      {/* Step button */}
                      <button
                        onClick={() => setActiveStep(step.id)}
                        className={`flex flex-col items-center relative group ${
                          activeStep === step.id ? "opacity-100" : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        {/* Circle with number and icon */}
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${
                            activeStep === step.id
                              ? "bg-yellow-300 text-black"
                              : isFinancialSection
                                ? "bg-purple-900 text-purple-200 group-hover:bg-purple-800"
                                : "bg-gray-800 text-gray-300 group-hover:bg-gray-700"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <StepIcon className="h-6 w-6" />
                            <span className="text-xs font-bold mt-1">{step.id}</span>
                          </div>
                        </div>

                        {/* Step name */}
                        <span
                          className={`text-sm font-medium whitespace-nowrap max-w-[120px] text-center ${
                            activeStep === step.id
                              ? "text-yellow-300"
                              : isFinancialSection
                                ? "text-purple-200 group-hover:text-purple-100"
                                : "text-gray-400 group-hover:text-white"
                          }`}
                        >
                          {step.name}
                        </span>

                        {/* Active indicator */}
                        {activeStep === step.id && (
                          <div className="absolute -bottom-4 w-full h-1 bg-yellow-300 rounded-full"></div>
                        )}
                      </button>

                      {/* Connector line between steps */}
                      {index < steps.length - 1 && index !== 6 && (
                        <div
                          className={`w-12 h-[2px] mx-2 ${
                            index < activeStep ? "bg-yellow-300" : index === 7 ? "bg-purple-600" : "bg-gray-700"
                          }`}
                        ></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="p-6">
            <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
              {/* Table header with actions */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold text-white mr-2">{steps[activeStep].name}</h2>
                    <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                      {filteredOrders.length} items
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-yellow-300 text-black hover:bg-yellow-400 border-yellow-300"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Search and filters */}
                <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search SKU's..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0a0a14] border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                        onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                        {filterMenuOpen ? (
                          <ChevronUp className="h-4 w-4 ml-2" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-2" />
                        )}
                      </Button>
                    </div>

                    <div className="text-xs text-gray-400">
                      Sorted by {sortField} • {sortDirection === "asc" ? "Ascending" : "Descending"}
                    </div>
                  </div>
                </div>

                {/* Step-specific filters */}
                {filterMenuOpen && (
                  <div className="mt-4 p-4 bg-[#0a0a14] rounded-md border border-gray-700">
                    {getStepFiltersComponent()}
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="px-4 py-2 bg-gray-800/30 border-b border-gray-700 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-md bg-gray-700 border border-gray-600 mr-2">
                    <List className="h-4 w-4 text-gray-300" />
                  </div>
                  <span className="text-xs text-gray-400">Order details</span>
                </div>
                <div className="flex items-center">
                  <div className="p-1.5 rounded-md bg-gray-700 border border-gray-600 mr-2">
                    <Package className="h-4 w-4 text-gray-300" />
                  </div>
                  <span className="text-xs text-gray-400">SKU details</span>
                </div>
                <div className="flex items-center">
                  <div className="p-1.5 rounded-md bg-gray-700 border border-gray-600 mr-2">
                    <Users className="h-4 w-4 text-gray-300" />
                  </div>
                  <span className="text-xs text-gray-400">Engagement details</span>
                </div>
                <div className="flex items-center">
                  <div className="p-1 rounded-full bg-green-600 mr-2">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">Approved</span>
                </div>
                <div className="flex items-center">
                  <div className="p-1 rounded-full bg-red-600 mr-2">
                    <X className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">Rejected</span>
                </div>
                <div className="flex items-center">
                  <div className="p-1 rounded-full bg-yellow-600 mr-2">
                    <Clock className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">Pending approval</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                  <thead className="bg-[#0a0a14] text-left">
                    <tr>
                      <th className="px-4 py-3 text-gray-300 w-10">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedOrders.length === sortedOrders.length && sortedOrders.length > 0}
                            onChange={handleSelectAll}
                            className="h-4 w-4 rounded border-gray-700 text-yellow-300 focus:ring-yellow-300 focus:ring-opacity-25"
                          />
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-gray-300 cursor-pointer w-[180px]"
                        onClick={() => handleSort("skuNumber")}
                      >
                        <div className="flex items-center">
                          <span>SKU# / Description</span>
                          {sortField === "skuNumber" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                            ) : (
                              <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-gray-300 cursor-pointer w-[120px]"
                        onClick={() => handleSort("orderDate")}
                      >
                        <div className="flex items-center">
                          <span>Date</span>
                          {sortField === "orderDate" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                            ) : (
                              <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-gray-300 cursor-pointer w-[200px]" onClick={() => handleSort("id")}>
                        <div className="flex items-center">
                          <span>Order ID / Name</span>
                          {sortField === "id" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                            ) : (
                              <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-gray-300 cursor-pointer w-[180px]"
                        onClick={() => handleSort("engagementCode")}
                      >
                        <div className="flex items-center">
                          <span>Engagement Code / Country</span>
                          {sortField === "engagementCode" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                            ) : (
                              <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-gray-300">
                        <div className="text-left">
                          <span>Expected Approvals</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedOrders.length > 0 ? (
                      sortedOrders.map((order) => (
                        <React.Fragment key={order.id}>
                          {/* Main order row - first line */}
                          <tr
                            className={`border-t border-gray-800 hover:bg-gray-800/30 cursor-pointer ${
                              selectedOrders.includes(order.id) ? "bg-gray-800/50" : ""
                            }`}
                            onClick={() => toggleOrderDetails(order.id)}
                          >
                            {/* Checkbox column - spans 2 rows */}
                            <td className="px-4 py-2 align-top" rowSpan={2}>
                              <input
                                type="checkbox"
                                checked={selectedOrders.includes(order.id)}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  handleSelectOrder(order.id)
                                }}
                                className="h-4 w-4 rounded border-gray-700 text-yellow-300 focus:ring-yellow-300 focus:ring-opacity-25"
                              />
                            </td>

                            {/* SKU# on first row with info icon */}
                            <td className="px-4 py-2 pb-0 text-gray-300 font-medium whitespace-nowrap">
                              <div className="flex items-center">
                                <span>{order.skuNumber}</span>
                                <button
                                  className="ml-2 p-1.5 rounded-md bg-gray-700 hover:bg-yellow-300 hover:text-black transition-colors border border-gray-600"
                                  onClick={(e) => toggleSkuDetails(order.id, e)}
                                  title="View SKU details"
                                >
                                  <Package className="h-4 w-4" />
                                  <span className="sr-only">View SKU details</span>
                                </button>
                              </div>
                            </td>

                            {/* Date on first row */}
                            <td className="px-4 py-2 pb-0 text-gray-300 font-medium whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="text-xs">
                                  {order.orderDate.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {order.orderDate
                                    .toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })
                                    .toLowerCase()}{" "}
                                  EST
                                </span>
                              </div>
                            </td>

                            {/* Order ID on first row with info icon */}
                            <td className="px-4 py-2 pb-0 text-white font-medium whitespace-nowrap">
                              <div className="flex items-center">
                                <span>{order.id}</span>
                                <button
                                  className="ml-2 p-1.5 rounded-md bg-gray-700 hover:bg-yellow-300 hover:text-black transition-colors border border-gray-600"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleOrderDetails(order.id)
                                  }}
                                  title="View order details"
                                >
                                  <List className="h-4 w-4" />
                                  <span className="sr-only">View order details</span>
                                </button>
                              </div>
                            </td>

                            {/* Engagement Code on first row with info icon */}
                            <td className="px-4 py-2 pb-0 text-gray-300 whitespace-nowrap">
                              <div className="flex items-center">
                                <span>{order.engagementCode}</span>
                                <button
                                  className="ml-2 p-1.5 rounded-md bg-gray-700 hover:bg-yellow-300 hover:text-black transition-colors border border-gray-600"
                                  onClick={(e) => toggleEngagementDetails(order.id, e)}
                                  title="View engagement details"
                                >
                                  <Users className="h-4 w-4" />
                                  <span className="sr-only">View engagement details</span>
                                </button>
                              </div>
                            </td>

                            {/* Approval Buttons */}
                            <td className="px-4 py-2 pb-0">
                              <div className="flex flex-wrap gap-1 justify-start">
                                {renderApprovalButton(order, "product", "Product")}
                                {renderApprovalButton(order, "deployment", "Deploy")}
                                {renderApprovalButton(order, "local_risk", "Local Risk")}
                                {renderApprovalButton(order, "global_risk", "Global Risk")}
                                {renderApprovalButton(order, "engagement", "Engagement")}
                              </div>
                            </td>
                          </tr>

                          {/* Second row for each order */}
                          <tr
                            className={`border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer ${
                              selectedOrders.includes(order.id) ? "bg-gray-800/50" : ""
                            }`}
                            onClick={() => toggleOrderDetails(order.id)}
                          >
                            {/* SKU Description on second row */}
                            <td className="px-4 py-2 pt-0 text-gray-400 text-sm whitespace-nowrap">
                              <span>{order.skuDescription}</span>
                            </td>

                            {/* Empty cell for date column on second row */}
                            <td className="px-4 py-2 pt-0"></td>

                            {/* Order Name on second row */}
                            <td className="px-4 py-2 pt-0 text-gray-400 text-sm whitespace-nowrap">{order.name}</td>

                            {/* Country on second row */}
                            <td className="px-4 py-2 pt-0 text-gray-400 text-sm whitespace-nowrap">
                              <div className="flex items-center justify-between">
                                <span>{order.country}</span>
                                <span className="text-xs text-gray-500">Partner: {order.engagementPartner}</span>
                              </div>
                            </td>

                            {/* Empty cell for the approval column on second row */}
                            <td className="px-4 py-2 pt-0"></td>
                          </tr>

                          {/* Expanded Order Details */}
                          {expandedOrderId === order.id && (
                            <tr>
                              <td colSpan={6} className="px-0 py-0 bg-gray-800/30">
                                <div className="p-4 border-t border-b border-gray-700 bg-[#0a0a14]/50">
                                  <div className="flex items-center mb-3">
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-300 text-black mr-2">
                                      <List className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-white font-medium">Order Items</h3>
                                  </div>
                                  <div className="bg-[#0a0a14] rounded-md border border-gray-700 overflow-hidden">
                                    <table className="w-full">
                                      <thead className="bg-gray-800/50">
                                        <tr>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-300">
                                            Item Name
                                          </th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-300">
                                            Quantity
                                          </th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-300">
                                            Cost
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {order.orderItems.map((item, index) => (
                                          <tr key={index} className="border-t border-gray-700">
                                            <td className="px-4 py-2 text-sm text-gray-300">{item.name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-300">{item.quantity}</td>
                                            <td className="px-4 py-2 text-sm text-gray-300">{item.cost}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="mt-3 text-right">
                                    <button
                                      className="text-sm text-yellow-300 hover:underline"
                                      onClick={() => toggleOrderDetails(order.id)}
                                    >
                                      Close Details
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}

                          {/* Expanded SKU Details */}
                          {expandedSkuId === order.id && (
                            <tr>
                              <td colSpan={6} className="px-0 py-0 bg-gray-800/30">
                                <div className="p-4 border-t border-b border-gray-700 bg-[#0a0a14]/50">
                                  <div className="flex items-center mb-3">
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-300 text-black mr-2">
                                      <Package className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-white font-medium">SKU Details</h3>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-xs font-medium text-gray-400 mb-1">Full Description</h4>
                                      <p className="text-sm text-gray-300 bg-[#0a0a14] p-3 rounded-md border border-gray-700">
                                        {order.skuDetails.fullDescription}
                                      </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="text-xs font-medium text-gray-400 mb-1">Increment Period</h4>
                                        <p className="text-sm text-gray-300 bg-[#0a0a14] p-3 rounded-md border border-gray-700">
                                          {order.skuDetails.increments}
                                        </p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-medium text-gray-400 mb-1">Minimum Increments</h4>
                                        <p className="text-sm text-gray-300 bg-[#0a0a14] p-3 rounded-md border border-gray-700">
                                          {order.skuDetails.minIncrements}
                                        </p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-medium text-gray-400 mb-1">Cost</h4>
                                        <p className="text-sm text-yellow-300 font-medium bg-[#0a0a14] p-3 rounded-md border border-gray-700">
                                          {order.skuDetails.cost}
                                        </p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-medium text-gray-400 mb-1">Commercial Owner</h4>
                                        <p className="text-sm text-gray-300 bg-[#0a0a14] p-3 rounded-md border border-gray-700">
                                          {order.commercialOwner}
                                        </p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-medium text-gray-400 mb-1">Ordered By</h4>
                                        <p className="text-sm text-gray-300 bg-[#0a0a14] p-3 rounded-md border border-gray-700">
                                          {order.orderedBy}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-3 text-right">
                                    <button
                                      className="text-sm text-yellow-300 hover:underline"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        toggleSkuDetails(order.id, e)
                                      }}
                                    >
                                      Close Details
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}

                          {/* Expanded Engagement Details */}
                          {expandedEngagementId === order.id && (
                            <tr>
                              <td colSpan={6} className="px-0 py-0 bg-gray-800/30">
                                <div className="p-4 border-t border-b border-gray-700 bg-[#0a0a14]/50">
                                  <div className="flex items-center mb-3">
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-300 text-black mr-2">
                                      <Users className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-white font-medium">Engagement Details</h3>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-xs font-medium text-gray-400 mb-1">Global Service Code</h4>
                                      <p className="text-sm text-gray-300 bg-[#0a0a14] p-3 rounded-md border border-gray-700">
                                        {order.globalServiceCode}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="text-xs font-medium text-gray-400 mb-1">Engagement Partner</h4>
                                      <p className="text-sm text-gray-300 bg-[#0a0a14] p-3 rounded-md border border-gray-700">
                                        {order.engagementPartner}
                                      </p>
                                    </div>
                                    <div className="md:col-span-2">
                                      <h4 className="text-xs font-medium text-gray-400 mb-1">Engagement Team</h4>
                                      <div className="bg-[#0a0a14] rounded-md border border-gray-700 overflow-hidden">
                                        <table className="w-full">
                                          <thead className="bg-gray-800/50">
                                            <tr>
                                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">
                                                Role
                                              </th>
                                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-300">
                                                Name
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {order.engagementTeam.map((member, index) => (
                                              <tr key={index} className="border-t border-gray-700">
                                                <td className="px-3 py-2 text-sm text-gray-300">{member.role}</td>
                                                <td className="px-3 py-2 text-sm text-gray-300">{member.name}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-3 text-right">
                                    <button
                                      className="text-sm text-yellow-300 hover:underline"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        toggleEngagementDetails(order.id, e)
                                      }}
                                    >
                                      Close Details
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          No SKU's found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table footer */}
              <div className="p-4 border-t border-gray-800 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {selectedOrders.length > 0 ? (
                    <span>
                      {selectedOrders.length} of {filteredOrders.length} selected
                    </span>
                  ) : (
                    <span>Showing {filteredOrders.length} orders</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                    disabled
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-300">Page 1 of 1</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                    disabled
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Recoveries Section */}
          {activeStep === 7 && (
            <div className="p-6">
              <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
                {/* Header with totals and filters */}
                <div className="p-4 border-b border-gray-800">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-white mr-2">Recoveries</h2>
                      <div className="flex items-center mt-2">
                        <span className="text-gray-300 mr-2">Total Billed:</span>
                        <span className="text-2xl font-bold text-yellow-300">${totalRecoveries.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {/* Past-oriented buttons */}
                      <div className="flex flex-wrap gap-2 mr-4 border-r border-gray-700 pr-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "month" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("month")}
                        >
                          This Month
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "running-month" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("running-month")}
                        >
                          Last 30 Days
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "quarter" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("quarter")}
                        >
                          This Quarter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "ytd" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("ytd")}
                        >
                          Year to Date
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "running-year" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("running-year")}
                        >
                          Last 365 Days
                        </Button>
                      </div>

                      {/* Future-oriented buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "next-30-days" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("next-30-days")}
                        >
                          Next 30 Days
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "rest-of-fy" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("rest-of-fy")}
                        >
                          Rest of FY
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Search and export */}
                  <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search SKU's..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#0a0a14] border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
                        />
                      </div>

                      {/* Toggle between Billed and Upcoming views */}
                      <div className="flex h-9 p-1 bg-gray-800 rounded-md">
                        <button
                          onClick={() => setRecoveryView("billed")}
                          className={`px-4 py-1 text-sm rounded-md transition-colors ${
                            recoveryView === "billed"
                              ? "bg-yellow-300 text-black font-medium"
                              : "text-gray-400 hover:text-gray-200"
                          }`}
                        >
                          Billed
                        </button>
                        <button
                          onClick={() => setRecoveryView("upcoming")}
                          className={`px-4 py-1 text-sm rounded-md transition-colors ${
                            recoveryView === "upcoming"
                              ? "bg-yellow-300 text-black font-medium"
                              : "text-gray-400 hover:text-gray-200"
                          }`}
                        >
                          Upcoming
                        </button>
                      </div>
                    </div>

                    {/* Empty div to maintain layout */}
                    <div></div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px]">
                    <thead className="bg-[#0a0a14] text-left">
                      <tr>
                        <th className="px-4 py-3 text-gray-300 w-10">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-700 text-yellow-300 focus:ring-yellow-300 focus:ring-opacity-25"
                            />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-gray-300 cursor-pointer" onClick={() => handleRecoverySort("id")}>
                          <div className="flex items-center">
                            <span>Recovery ID</span>
                            {recoverySort.field === "id" &&
                              (recoverySort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleRecoverySort("client")}
                        >
                          <div className="flex items-center">
                            <span>Client</span>
                            {recoverySort.field === "client" &&
                              (recoverySort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleRecoverySort("amount")}
                        >
                          <div className="flex items-center">
                            <span>Amount</span>
                            {recoverySort.field === "amount" &&
                              (recoverySort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleRecoverySort("dateBilled")}
                        >
                          <div className="flex items-center">
                            <span>Date Pushed</span>
                            {recoverySort.field === "dateBilled" &&
                              (recoverySort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleRecoverySort("expectedRecoveryDate")}
                        >
                          <div className="flex items-center">
                            <span>Expected Recovery</span>
                            {recoverySort.field === "expectedRecoveryDate" &&
                              (recoverySort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleRecoverySort("status")}
                        >
                          <div className="flex items-center">
                            <span>Pushed to Billing Hub</span>
                            {recoverySort.field === "status" &&
                              (recoverySort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleRecoverySort("recoveryType")}
                        >
                          <div className="flex items-center">
                            <span>Type</span>
                            {recoverySort.field === "recoveryType" &&
                              (recoverySort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleRecoverySort("engagementCode")}
                        >
                          <div className="flex items-center">
                            <span>Engagement ID</span>
                            {recoverySort.field === "engagementCode" &&
                              (recoverySort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecoveries.length > 0 ? (
                        filteredRecoveries.map((recovery) => (
                          <tr
                            key={recovery.id}
                            className="border-t border-gray-800 hover:bg-gray-800/30 cursor-pointer"
                          >
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-700 text-yellow-300 focus:ring-yellow-300 focus:ring-opacity-25"
                              />
                            </td>
                            <td className="px-4 py-3 text-white">{recovery.id}</td>
                            <td className="px-4 py-3 text-gray-300">{recovery.client}</td>
                            <td className="px-4 py-3 text-yellow-300 font-medium">
                              ${recovery.amount.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-gray-300">
                              {recovery.dateBilled.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                            <td className="px-4 py-3 text-gray-300">
                              {recovery.expectedRecoveryDate
                                ? recovery.expectedRecoveryDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "N/A"}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  recovery.status === "Paid"
                                    ? "bg-green-900/50 text-green-300"
                                    : recovery.status === "Pending"
                                      ? "bg-yellow-900/50 text-yellow-300"
                                      : "bg-purple-900/50 text-purple-300"
                                }`}
                              >
                                {recovery.status === "Paid"
                                  ? "Billed to Region"
                                  : recovery.status === "Pending"
                                    ? "Billed to Eng + Region"
                                    : "Active but not Billed"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300">{recovery.recoveryType}</td>
                            <td className="px-4 py-3 text-gray-300">{recovery.engagementCode}</td>
                          </tr>
                        ))
                      ) : (
                        // Sample data when no results are found
                        <tr className="border-t border-gray-800 hover:bg-gray-800/30 cursor-pointer">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-700 text-yellow-300 focus:ring-yellow-300 focus:ring-opacity-25"
                            />
                          </td>
                          <td className="px-4 py-3 text-white">REC-2023-SAMPLE</td>
                          <td className="px-4 py-3 text-gray-300">Sample Client Corp</td>
                          <td className="px-4 py-3 text-yellow-300 font-medium">$5,000</td>
                          <td className="px-4 py-3 text-gray-300">Jan 15, 2023</td>
                          <td className="px-4 py-3 text-gray-300">Feb 15, 2023</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/50 text-yellow-300">
                              Billed to Eng + Region
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-300">License Fee</td>
                          <td className="px-4 py-3 text-gray-300">GBFSI-2023-SAMPLE</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table footer */}
                <div className="p-4 border-t border-gray-800 flex items-center justify-between">
                  <span>Showing {filteredRecoveries.length > 0 ? filteredRecoveries.length : 1} recoveries</span>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      disabled
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-300">Page 1 of 1</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      disabled
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Returns Section */}
          {activeStep === 8 && (
            <div className="p-6">
              <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
                {/* Header with totals and filters */}
                <div className="p-4 border-b border-gray-800">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-white mr-2">Returns</h2>
                      <div className="flex items-center mt-2">
                        <span className="text-gray-300 mr-2">Total Returns:</span>
                        <span className="text-2xl font-bold text-yellow-300">${totalReturns.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {/* Past-oriented buttons */}
                      <div className="flex flex-wrap gap-2 mr-4 border-r border-gray-700 pr-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "month" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("month")}
                        >
                          This Month
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "running-month" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("running-month")}
                        >
                          Last 30 Days
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "quarter" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("quarter")}
                        >
                          This Quarter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "ytd" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("ytd")}
                        >
                          Year to Date
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "running-year" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("running-year")}
                        >
                          Last 365 Days
                        </Button>
                      </div>

                      {/* Future-oriented buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "next-30-days" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("next-30-days")}
                        >
                          Next 30 Days
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${timePeriod === "rest-of-fy" ? "bg-yellow-300 text-black" : "bg-gray-700 text-white"}`}
                          onClick={() => setTimePeriod("rest-of-fy")}
                        >
                          Rest of FY
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Search and export */}
                  <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search SKU's..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0a0a14] border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px]">
                    <thead className="bg-[#0a0a14] text-left">
                      <tr>
                        <th className="px-4 py-3 text-gray-300 w-10">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-700 text-yellow-300 focus:ring-yellow-300 focus:ring-opacity-25"
                            />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-gray-300 cursor-pointer" onClick={() => handleReturnSort("id")}>
                          <div className="flex items-center">
                            <span>Return ID</span>
                            {returnSort.field === "id" &&
                              (returnSort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleReturnSort("client")}
                        >
                          <div className="flex items-center">
                            <span>Client</span>
                            {returnSort.field === "client" &&
                              (returnSort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleReturnSort("amount")}
                        >
                          <div className="flex items-center">
                            <span>Amount</span>
                            {returnSort.field === "amount" &&
                              (returnSort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleReturnSort("dateRequested")}
                        >
                          <div className="flex items-center">
                            <span>Date Requested</span>
                            {returnSort.field === "dateRequested" &&
                              (returnSort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleReturnSort("expectedReturnDate")}
                        >
                          <div className="flex items-center">
                            <span>Expected Return</span>
                            {returnSort.field === "expectedReturnDate" &&
                              (returnSort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleReturnSort("status")}
                        >
                          <div className="flex items-center">
                            <span>Status</span>
                            {returnSort.field === "status" &&
                              (returnSort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleReturnSort("returnType")}
                        >
                          <div className="flex items-center">
                            <span>Type</span>
                            {returnSort.field === "returnType" &&
                              (returnSort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-gray-300 cursor-pointer"
                          onClick={() => handleReturnSort("orderId")}
                        >
                          <div className="flex items-center">
                            <span>Order ID</span>
                            {returnSort.field === "orderId" &&
                              (returnSort.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                              ))}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReturns.length > 0 ? (
                        filteredReturns.map((returnItem) => (
                          <tr
                            key={returnItem.id}
                            className="border-t border-gray-800 hover:bg-gray-800/30 cursor-pointer"
                          >
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-700 text-yellow-300 focus:ring-yellow-300 focus:ring-opacity-25"
                              />
                            </td>
                            <td className="px-4 py-3 text-white">{returnItem.id}</td>
                            <td className="px-4 py-3 text-gray-300">{returnItem.client}</td>
                            <td className="px-4 py-3 text-yellow-300 font-medium">
                              ${returnItem.amount.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-gray-300">
                              {returnItem.dateRequested.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                            <td className="px-4 py-3 text-gray-300">
                              {returnItem.expectedReturnDate
                                ? returnItem.expectedReturnDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "N/A"}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  returnItem.status === "Approved"
                                    ? "bg-green-900/50 text-green-300"
                                    : returnItem.status === "Pending"
                                      ? "bg-yellow-900/50 text-yellow-300"
                                      : "bg-red-900/50 text-red-300"
                                }`}
                              >
                                {returnItem.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300">{returnItem.returnType}</td>
                            <td className="px-4 py-3 text-gray-300">{returnItem.orderId}</td>
                          </tr>
                        ))
                      ) : (
                        // Sample data when no results are found
                        <tr className="border-t border-gray-800 hover:bg-gray-800/30 cursor-pointer">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-700 text-yellow-300 focus:ring-yellow-300 focus:ring-opacity-25"
                            />
                          </td>
                          <td className="px-4 py-3 text-white">RET-2023-SAMPLE</td>
                          <td className="px-4 py-3 text-gray-300">Sample Client Corp</td>
                          <td className="px-4 py-3 text-yellow-300 font-medium">$3,500</td>
                          <td className="px-4 py-3 text-gray-300">Jan 20, 2023</td>
                          <td className="px-4 py-3 text-gray-300">Feb 20, 2023</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/50 text-yellow-300">
                              Pending
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-300">Partial Refund</td>
                          <td className="px-4 py-3 text-gray-300">ORD-2023-SAMPLE</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table footer */}
                <div className="p-4 border-t border-gray-800 flex items-center justify-between">
                  <span>Showing {filteredReturns.length > 0 ? filteredReturns.length : 1} returns</span>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      disabled
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-300">Page 1 of 1</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      disabled
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

