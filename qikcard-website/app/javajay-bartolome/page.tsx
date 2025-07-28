import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Mail,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Server,
  ExternalLink,
  Download,
  Share2,
  Zap,
  Users,
  Trophy,
  Target,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Java Jay Bartolome - QikCard Profile | IT Specialist & Software Engineer",
  description:
    "Explore Java Jay Bartolome's professional QikCard profile. IT Specialist with expertise in server management, cloud computing, and AI-driven solutions. Experience the future of digital professional profiles with Web3 integration.",
  keywords: [
    "Java Jay Bartolome",
    "IT Specialist",
    "Software Engineer",
    "QikCard Profile",
    "Web3 Resume",
    "Digital Identity",
    "Server Management",
    "Cloud Computing",
    "Linux Administration",
    "VMware",
    "AWS",
    "Cybersecurity",
    "IoT Solutions",
    "AI Development",
    "Professional Profile",
    "Digital CV",
    "Blockchain Resume",
  ],
  openGraph: {
    title: "Java Jay Bartolome - QikCard Profile | IT Specialist & Software Engineer",
    description:
      "Discover how QikCard transforms professional profiles with Web3 technology. View Java Jay's comprehensive IT expertise and achievements.",
    images: ["/MetaSEO-Image.png"],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Java Jay Bartolome - QikCard Profile",
    description: "Experience the future of professional profiles with QikCard's Web3 integration",
    images: ["/MetaSEO-Image.png"],
  },
}

export default function JavaJayProfile() {
  const skills = {
    "Industry Knowledge": [
      "IT Infrastructure Management",
      "IT Operations",
      "Cybersecurity",
      "Cloud Computing",
      "Data Science",
      "Project Management",
      "Internet of Things (IoT)",
      "Artificial Intelligence (AI)",
      "Machine Learning",
      "IT Integration",
      "Customer Service",
    ],
    "Tools & Technologies": [
      "Linux System Administration",
      "Linux Server Management",
      "VMware",
      "Proxmox",
      "Amazon Web Services (AWS)",
      "Data Visualization (Tableau)",
      "R Programming",
      "Java",
    ],
    "Interpersonal Skills": ["Analytical Skills", "Team Collaboration", "Leadership", "Problem Solving"],
  }

  const certifications = [
    { name: "Software Engineer Intern", issuer: "HackerRank", year: "2024" },
    { name: "Software Engineer", issuer: "HackerRank", year: "2024" },
    { name: "NDG Linux Essentials", issuer: "Cisco Networking Academy", year: "2024" },
    { name: "NDG Linux Unhatched", issuer: "Cisco Networking Academy", year: "2024" },
    { name: "JavaScript (Intermediate)", issuer: "HackerRank", year: "2024" },
    { name: "Java", issuer: "HackerRank", year: "2024" },
    { name: "JavaScript (Basic)", issuer: "HackerRank", year: "2024" },
    { name: "C# (Basic)", issuer: "HackerRank", year: "2024" },
    { name: "SQL (Advanced)", issuer: "HackerRank", year: "2024" },
    { name: "SQL (Intermediate)", issuer: "HackerRank", year: "2024" },
    { name: "SQL (Basic)", issuer: "HackerRank", year: "2024" },
    { name: "Python (Basic)", issuer: "HackerRank", year: "2024" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              QikCard
            </Link>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Sample Profile
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src="/javajay-headshot.jpg"
                  alt="Java Jay Bartolome"
                  className="object-cover object-center"
                />
                <AvatarFallback className="text-2xl font-bold bg-blue-600 text-white">JB</AvatarFallback>
              </Avatar>

              <div className="flex-1 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Java Jay Bartolome</h1>
                    <p className="text-xl text-gray-600 mt-1">Information Technology Specialist</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Philippines, Manila</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>javajay@qikcard.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Profile
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* QikCard Features Demo */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">QikCard Features Active</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓ Verified Identity
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  ✓ Web3 Wallet Connected
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  ✓ Digital Credentials
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  ✓ NFC Enabled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Dedicated and highly skilled Information Technology Specialist with extensive experience in managing
                  IT infrastructure, server administration, and network security. Proficient in Linux system management,
                  virtualization technologies such as VMware and Proxmox, and cloud computing with AWS. A proven leader
                  in developing innovative IoT and AI-driven solutions, including robotics systems like E.V.E.E. Adept
                  at handling complex IT projects, ensuring efficient operations, and delivering results in high-demand
                  environments. Strong analytical skills, a commitment to excellence, and a customer-centric approach to
                  technical support and problem-solving.
                </p>
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-2 border-blue-200 pl-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">Information Technology Specialist</h3>
                      <Badge variant="outline">June 2020 - July 2024</Badge>
                    </div>
                    <p className="text-blue-600 font-medium">ArcadianRift LLC • Philippines</p>
                    <ul className="mt-3 space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Managed server infrastructure supporting over 50 game servers, web hosting servers, and VPNs
                          to ensure seamless operations
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Oversaw network and private network setups, increasing virtualization efficiency by 30% using
                          VMware and Proxmox
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Implemented and maintained network security, ensuring 99.9% secure access to critical systems
                          across the company
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Configured firewalls and proxy protocols, reducing security breaches by 15% and enhancing
                          network integrity
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Optimized server performance, boosting operational efficiency by 25% through automated
                          monitoring tools and regular audits
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Ensured system reliability and reduced downtime to under 1%, improving network and server
                          uptime for critical operations
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  Key Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-2 border-green-200 pl-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">Automated Trash Bin: E.V.E.E. (Droid)</h3>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        May 2023 - June 2024
                      </Badge>
                    </div>
                    <p className="text-green-600 font-medium">PHINMA Saint Jude College</p>
                    <p className="mt-2 text-gray-600 italic">
                      Enhancing Waste Management through Robotics and Smart Technology
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Developed E.V.E.E. (Droid), an automated waste disposal system, reducing waste management time
                          by 40% through robotics and IoT integration
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Led the design and implementation of advanced waste sorting algorithms, improving sorting
                          accuracy by 60%
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Deployed E.V.E.E. in multiple organizations, contributing to a 30% reduction in overall waste
                          output
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Focused on sustainable practices, cutting carbon emissions by 20% through eco-friendly waste
                          disposal processes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Provided businesses with a cost-effective waste management solution, reducing operational
                          costs by 15%
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Involvement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Leadership & Involvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-l-2 border-purple-200 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">Technical Director & IT Specialist</h3>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      August 2022 - May 2024
                    </Badge>
                  </div>
                  <p className="text-purple-600 font-medium">PHINMA Saint Jude College Manila • La Liga Historia</p>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Serve as Technical Director and IT specialist at La Liga Historia, managing the Facebook page
                        with 1,000+ followers
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Oversee streaming operations, ensuring 99% uptime for live broadcasts and events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Set up and manage sound systems for live events, enhancing audio quality by 20% through advanced
                        equipment and technical adjustments
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Provide real-time technical support during events, reducing audio disruptions by 80%</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">STEM - Senior High School</h4>
                  <p className="text-sm text-gray-600">PHINMA Saint Jude College</p>
                  <p className="text-sm text-gray-500">Philippines, Manila • 2024</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-gray-900">Bachelor of Science in Computer Science</h4>
                  <p className="text-sm text-gray-600">Technological Institute of the Philippines</p>
                  <p className="text-sm text-gray-500">Philippines, Q.C • 2024</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-gray-900">High School Diploma</h4>
                  <p className="text-sm text-gray-600">Sergio Osmeña, Sr. High School</p>
                  <p className="text-sm text-gray-500">Philippines, Q.C • 2022</p>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-gray-900 mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-1">
                      {skillList.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {category !== "Interpersonal Skills" && <Separator className="mt-3" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Trophy className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{cert.name}</p>
                        <p className="text-xs text-gray-600">{cert.issuer}</p>
                        <p className="text-xs text-gray-500">{cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* QikCard Demo */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Zap className="w-5 h-5" />
                  QikCard Features
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Experience the future of professional networking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Web3 Wallet Integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>NFC Tap-to-Connect</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Digital Credential Verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Blockchain-Secured Profile</span>
                </div>
                <Button className="w-full mt-4" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Get Your QikCard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-2">Ready to Create Your QikCard Profile?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join the future of professional networking with Web3-powered digital identity, NFC connectivity, and
              blockchain-verified credentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <ExternalLink className="w-5 h-5 mr-2" />
                Create Your Profile
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Learn More About QikCard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
