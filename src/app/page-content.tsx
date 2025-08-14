'use client'

import Link from 'next/link'
import { FileText, Download, ExternalLink, BookOpen, Users, Gavel, Heart, Brain, Share2, FileText as FileIcon, Eye, X, MessageCircle, Send, Mail, DollarSign } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Document } from '@prisma/client'

const iconComponents: { [key: string]: React.ElementType } = {
  BookOpen,
  Brain,
  FileText,
  Gavel,
  Heart,
}

interface HomePageContentProps {
  documents: Document[]
}

export default function HomePageContent({ documents }: HomePageContentProps) {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const downloadFile = (filename: string) => {
    const element = document.createElement('a')
    element.setAttribute('href', `/${filename}`)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const viewDocument = (doc: Document) => {
    setSelectedDoc(doc)
    setIsViewerOpen(true)
  }

  const shareToSocial = (platform: string, title: string, url: string) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    }

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
    }
  }

  const openSurvey = () => {
    window.open('https://forms.gle/o9HPp3KG41hMmtSRA', '_blank')
  }

  const signPetition = () => {
    window.open('https://secure.avaaz.org/community_petitions/en/european_medicines_agency_ema_add_a_black_box_warning_to_zyprexa_permanent_neurological_damage_is_a_real_risk_lobotomy/?cvLUmkb&utm_source=copy&utm_medium=social_share&utm_campaign=1746439&utm_term=cvLUmkb%2Ben&share_location=do_landing', '_blank')
  }

  const donateNow = () => {
    window.open('https://gofund.me/7e2b2901', '_blank')
  }

  const SocialShareDropdown = ({ doc, onShare }: { doc: any, onShare: (platform: string) => void }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onShare('twitter')}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare('facebook')}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare('linkedin')}>
            <MessageCircle className="w-4 h-4 mr-2" />
            LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare('whatsapp')}>
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare('reddit')}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Reddit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare('telegram')}>
            <Send className="w-4 h-4 mr-2" />
            Telegram
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare('email')}>
            <Mail className="w-4 h-4 mr-2" />
            Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const shareDocument = (doc: any, platform: string = 'twitter') => {
    const title = `Zyprexa Survivors Guide: ${doc.title}`
    const url = window.location.origin
    shareToSocial(platform, title, url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Zyprexa Survivors Guide Collection</h1>
              <p className="text-gray-600 mt-2">Comprehensive resources for understanding, treating, and advocating for Zyprexa recovery</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <img
                  src="/logo.svg"
                  alt="Z.ai Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Complete Resource for Zyprexa Recovery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Evidence-based guides covering scientific understanding, treatment options, legal rights,
            and advocacy strategies for Zyprexa (olanzapine) survivors.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={openSurvey}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            <FileIcon className="w-5 h-5 mr-2" />
            Take the Survey
          </button>
          <button
            onClick={signPetition}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            <Gavel className="w-5 h-5 mr-2" />
            Sign the Petition
          </button>
          <button
            onClick={donateNow}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Donate Now
          </button>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Start Simple</h4>
              <p className="text-gray-600 text-sm">Begin with the One-Page Summary for a quick overview</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Take Action</h4>
              <p className="text-gray-600 text-sm">Use the Quick Reference Guide for daily treatment protocols</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Deep Dive</h4>
              <p className="text-gray-600 text-sm">Explore the Comprehensive Guide for complete understanding</p>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {documents.map((doc) => {
            const IconComponent = iconComponents[doc.icon] || FileIcon
            return (
              <div key={doc.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 rounded-lg p-3 mr-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{doc.title}</h3>
                    <p className="text-sm text-gray-500">{doc.length} • {doc.format}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {doc.description}
                </p>

                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-700">Best for:</span>
                  <p className="text-xs text-gray-600 mt-1">{doc.bestFor}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => viewDocument(doc)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => downloadFile(doc.filename)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                  <SocialShareDropdown doc={doc} onShare={(platform) => shareDocument(doc, platform)} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Key Information Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-600" />
              Understanding Zyprexa Damage
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Receptor downregulation and epigenetic changes
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Metabolic collapse and insulin resistance
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Emotional blunting and cognitive impairment
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Loss of psychoactive responsiveness
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-green-600" />
              Evidence-Based Treatments
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Betahistine for D2 receptor recovery
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                GLP-1 agonists for metabolic repair
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Ketogenic diet for brain energy support
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Ketamine therapy for neuroplasticity
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Advocacy Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <Gavel className="w-6 h-6 mr-2" />
            Legal Rights & Advocacy
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Eli Lilly's History</h4>
              <ul className="space-y-2 text-purple-100">
                <li>• $1.415 billion settlement for illegal marketing</li>
                <li>• Knew about risks years before disclosure</li>
                <li>• Over $2.6 billion in total settlements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Your Rights</h4>
              <ul className="space-y-2 text-purple-100">
                <li>• Right to informed consent</li>
                <li>• Right to compensation for harm</li>
                <li>• Right to access medical records</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Recovery Journey</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            You are not alone. Thousands of survivors are experiencing similar effects from Zyprexa.
            Your symptoms are real, scientifically documented, and valid. Recovery is possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => viewDocument(documents[4])}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <Eye className="w-5 h-5 mr-2 inline" />
              View One-Page Summary
            </button>
            <button
              onClick={() => downloadFile(documents[0].filename)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5 mr-2 inline" />
              Download Action Guide
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300 mb-2">
              This collection is for informational purposes only. Always consult with qualified healthcare providers.
            </p>
            <p className="text-gray-400 text-sm">
              Created with compassion for Zyprexa survivors worldwide.
            </p>
          </div>
        </div>
      </footer>

      {/* Document Viewer Modal */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">
                {selectedDoc?.title}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsViewerOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {selectedDoc?.format}
              </span>
              <span>{selectedDoc?.length}</span>
              <span>Best for: {selectedDoc?.bestFor}</span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => selectedDoc && downloadFile(selectedDoc.filename)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Document
              </Button>
              <SocialShareDropdown doc={selectedDoc} onShare={(platform) => selectedDoc && shareDocument(selectedDoc, platform)} />
            </div>
            <ScrollArea className="max-h-[60vh] border rounded-lg p-4">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {selectedDoc?.content}
                </pre>
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
