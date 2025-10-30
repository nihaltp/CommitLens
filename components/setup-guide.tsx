"use client"

import { AlertCircle, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SetupGuideProps {
  missingVars?: string[]
}

export function SetupGuide({
  missingVars = ["KV_REST_API_URL", "KV_REST_API_TOKEN", "GITHUB_TOKEN"],
}: SetupGuideProps) {
  const [copiedVar, setCopiedVar] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedVar(text)
    setTimeout(() => setCopiedVar(null), 2000)
  }

  return (
    <div className="space-y-4 mb-8">
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle>Setup Required</AlertTitle>
        <AlertDescription>
          CommitLens needs some environment variables to work optimally. Add them in the Vars section of the sidebar.
        </AlertDescription>
      </Alert>

      <Card className="bg-card border-border p-6">
        <h3 className="font-semibold mb-4">Missing Configuration</h3>
        <div className="space-y-3">
          {missingVars.includes("GITHUB_TOKEN") && (
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">GITHUB_TOKEN</p>
                  <p className="text-xs text-muted-foreground">
                    Increases API rate limit from 60 to 5,000 requests/hour
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard("GITHUB_TOKEN")} className="ml-2">
                  {copiedVar === "GITHUB_TOKEN" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Create at{" "}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  github.com/settings/tokens
                </a>{" "}
                (no special permissions needed)
              </p>
            </div>
          )}

          {missingVars.includes("KV_REST_API_URL") && (
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">KV_REST_API_URL</p>
                  <p className="text-xs text-muted-foreground">Redis REST API endpoint for caching</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard("KV_REST_API_URL")} className="ml-2">
                  {copiedVar === "KV_REST_API_URL" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get from Upstash Redis console (already connected in your project)
              </p>
            </div>
          )}

          {missingVars.includes("KV_REST_API_TOKEN") && (
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">KV_REST_API_TOKEN</p>
                  <p className="text-xs text-muted-foreground">Redis authentication token</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard("KV_REST_API_TOKEN")}
                  className="ml-2"
                >
                  {copiedVar === "KV_REST_API_TOKEN" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get from Upstash Redis console (already connected in your project)
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium mb-2">How to add variables:</p>
          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Click the "Vars" section in the left sidebar</li>
            <li>Click "Add Variable"</li>
            <li>Enter the variable name and value</li>
            <li>
              Save and <strong>refresh the page</strong> (Ctrl+R or Cmd+R)
            </li>
          </ol>
          <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
            <strong>GitHub Token Permissions:</strong> No special permissions needed. Create a personal access token at{" "}
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              github.com/settings/tokens
            </a>{" "}
            and select "Generate new token (classic)". You can leave all permission checkboxes unchecked.
          </p>
        </div>
      </Card>
    </div>
  )
}
