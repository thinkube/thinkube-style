"use client";

import { TkPageWrapper } from "@/components/utilities";
import { TkCard, TkCardContent, TkCardDescription, TkCardHeader, TkCardTitle } from "@/components/cards-data";
import { TkInput, TkTextarea, TkLabel, TkCheckbox, TkRadioGroup, TkRadioGroupItem, TkSwitch, TkPasswordInput } from "@/components/forms-inputs";
import { TkSelect, TkSelectContent, TkSelectGroup, TkSelectItem, TkSelectLabel, TkSelectTrigger, TkSelectValue } from "@/components/forms-inputs";
import { TkButton } from "@/components/buttons-badges";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function FormsInputsPage() {
  const [serviceEnabled, setServiceEnabled] = useState(true);

  return (
    <TkPageWrapper
      title="Forms & TkInputs"
      description="All form controls, inputs, selects, checkboxes, and switches"
    >
      {/* Text TkInputs */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Text TkInputs</TkCardTitle>
          <TkCardDescription>Standard text input fields with labels and hints</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <div className="space-y-2">
            <TkLabel htmlFor="email">Email</TkLabel>
            <TkInput id="email" type="email" placeholder="Enter your email" />
            <p className="text-xs text-muted-foreground">We'll never share your email.</p>
          </div>

          <div className="space-y-2">
            <TkLabel htmlFor="username">Username</TkLabel>
            <TkInput id="username" type="text" placeholder="Enter username" />
          </div>

          <div className="space-y-2">
            <TkLabel htmlFor="password">Password</TkLabel>
            <TkPasswordInput id="password" placeholder="Enter password" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <TkLabel htmlFor="number">Number</TkLabel>
              <TkInput id="number" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <TkLabel htmlFor="date">Date</TkLabel>
              <TkInput id="date" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <TkLabel htmlFor="disabled">Disabled TkInput</TkLabel>
            <TkInput id="disabled" disabled value="This field is disabled" />
          </div>
        </TkCardContent>
      </TkCard>

      {/* TkTextarea */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>TkTextarea</TkCardTitle>
          <TkCardDescription>Multi-line text input</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <div className="space-y-2">
            <TkLabel htmlFor="description">Description</TkLabel>
            <TkTextarea
              id="description"
              placeholder="Enter a detailed description..."
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <TkLabel htmlFor="notes">Notes (Larger)</TkLabel>
            <TkTextarea
              id="notes"
              placeholder="Enter your notes..."
              className="min-h-48"
            />
          </div>
        </TkCardContent>
      </TkCard>

      {/* TkSelect Dropdowns */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>TkSelect Dropdowns</TkCardTitle>
          <TkCardDescription>Dropdown menus with and without groups</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <div className="space-y-2">
            <TkLabel>Simple TkSelect</TkLabel>
            <TkSelect>
              <TkSelectTrigger>
                <TkSelectValue placeholder="TkSelect an option" />
              </TkSelectTrigger>
              <TkSelectContent>
                <TkSelectItem value="option1">Option 1</TkSelectItem>
                <TkSelectItem value="option2">Option 2</TkSelectItem>
                <TkSelectItem value="option3">Option 3</TkSelectItem>
              </TkSelectContent>
            </TkSelect>
          </div>

          <div className="space-y-2">
            <TkLabel>Grouped TkSelect (Server Roles)</TkLabel>
            <TkSelect>
              <TkSelectTrigger>
                <TkSelectValue placeholder="TkSelect server role" />
              </TkSelectTrigger>
              <TkSelectContent>
                <TkSelectGroup>
                  <TkSelectLabel>Control Plane</TkSelectLabel>
                  <TkSelectItem value="master">Master Node</TkSelectItem>
                  <TkSelectItem value="control-plane">Control Plane</TkSelectItem>
                </TkSelectGroup>
                <TkSelectGroup>
                  <TkSelectLabel>Workers</TkSelectLabel>
                  <TkSelectItem value="worker">Worker Node</TkSelectItem>
                  <TkSelectItem value="gpu-worker">GPU Worker</TkSelectItem>
                </TkSelectGroup>
              </TkSelectContent>
            </TkSelect>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <TkLabel>Size</TkLabel>
              <TkSelect>
                <TkSelectTrigger className="h-9">
                  <TkSelectValue placeholder="Small" />
                </TkSelectTrigger>
                <TkSelectContent>
                  <TkSelectItem value="xs">Extra Small</TkSelectItem>
                  <TkSelectItem value="sm">Small</TkSelectItem>
                  <TkSelectItem value="md">Medium</TkSelectItem>
                </TkSelectContent>
              </TkSelect>
            </div>
            <div className="space-y-2">
              <TkLabel>Priority</TkLabel>
              <TkSelect>
                <TkSelectTrigger>
                  <TkSelectValue placeholder="TkSelect priority" />
                </TkSelectTrigger>
                <TkSelectContent>
                  <TkSelectItem value="low">Low</TkSelectItem>
                  <TkSelectItem value="medium">Medium</TkSelectItem>
                  <TkSelectItem value="high">High</TkSelectItem>
                </TkSelectContent>
              </TkSelect>
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* TkCheckboxes */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>TkCheckboxes</TkCardTitle>
          <TkCardDescription>Single and multiple checkboxes</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <TkCheckbox id="terms" />
            <TkLabel htmlFor="terms" className="font-normal cursor-pointer">
              Accept terms and conditions
            </TkLabel>
          </div>

          <div className="flex items-center space-x-2">
            <TkCheckbox id="marketing" defaultChecked />
            <TkLabel htmlFor="marketing" className="font-normal cursor-pointer">
              Send me marketing emails
            </TkLabel>
          </div>

          <div className="space-y-3 pt-2">
            <TkLabel>TkSelect features to enable:</TkLabel>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <TkCheckbox id="feature1" defaultChecked />
                <TkLabel htmlFor="feature1" className="font-normal cursor-pointer">
                  Enable GPU support
                </TkLabel>
              </div>
              <div className="flex items-center space-x-2">
                <TkCheckbox id="feature2" />
                <TkLabel htmlFor="feature2" className="font-normal cursor-pointer">
                  Enable monitoring
                </TkLabel>
              </div>
              <div className="flex items-center space-x-2">
                <TkCheckbox id="feature3" />
                <TkLabel htmlFor="feature3" className="font-normal cursor-pointer">
                  Enable auto-scaling
                </TkLabel>
              </div>
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* Radio TkButtons */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Radio TkButtons</TkCardTitle>
          <TkCardDescription>Single selection from multiple options</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <div className="space-y-3">
            <TkLabel>Installation Type</TkLabel>
            <TkRadioGroup defaultValue="standard">
              <div className="flex items-center space-x-2">
                <TkRadioGroupItem value="minimal" id="minimal" />
                <TkLabel htmlFor="minimal" className="font-normal cursor-pointer">
                  Minimal - Core components only
                </TkLabel>
              </div>
              <div className="flex items-center space-x-2">
                <TkRadioGroupItem value="standard" id="standard" />
                <TkLabel htmlFor="standard" className="font-normal cursor-pointer">
                  Standard - Recommended setup
                </TkLabel>
              </div>
              <div className="flex items-center space-x-2">
                <TkRadioGroupItem value="full" id="full" />
                <TkLabel htmlFor="full" className="font-normal cursor-pointer">
                  Full - All features enabled
                </TkLabel>
              </div>
            </TkRadioGroup>
          </div>
        </TkCardContent>
      </TkCard>

      {/* Toggle TkSwitches */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>Toggle TkSwitches</TkCardTitle>
          <TkCardDescription>On/off toggles for settings (used for service enable/disable)</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <TkLabel htmlFor="service-enabled">Service Enabled</TkLabel>
              <p className="text-xs text-muted-foreground">Enable or disable this service</p>
            </div>
            <TkSwitch
              id="service-enabled"
              checked={serviceEnabled}
              onCheckedChange={setServiceEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <TkLabel htmlFor="notifications">Notifications</TkLabel>
              <p className="text-xs text-muted-foreground">Receive email notifications</p>
            </div>
            <TkSwitch id="notifications" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <TkLabel htmlFor="auto-start">Auto-start on Boot</TkLabel>
              <p className="text-xs text-muted-foreground">Start service automatically</p>
            </div>
            <TkSwitch id="auto-start" defaultChecked />
          </div>
        </TkCardContent>
      </TkCard>

      {/* File TkInput */}
      <TkCard className="mb-8">
        <TkCardHeader>
          <TkCardTitle>File TkInput</TkCardTitle>
          <TkCardDescription>File upload controls</TkCardDescription>
        </TkCardHeader>
        <TkCardContent className="space-y-4">
          <div className="space-y-2">
            <TkLabel htmlFor="file">Upload File</TkLabel>
            <div className="flex items-center gap-2">
              <TkInput id="file" type="file" className="cursor-pointer" />
            </div>
          </div>

          <div className="space-y-2">
            <TkLabel htmlFor="custom-file">Custom File TkButton</TkLabel>
            <div className="flex items-center gap-2">
              <TkButton variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </TkButton>
              <span className="text-sm text-muted-foreground">No file chosen</span>
            </div>
          </div>
        </TkCardContent>
      </TkCard>

      {/* Complete Form Example */}
      <TkCard>
        <TkCardHeader>
          <TkCardTitle>Complete Form Example</TkCardTitle>
          <TkCardDescription>A realistic form combining multiple inputs</TkCardDescription>
        </TkCardHeader>
        <TkCardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <TkLabel htmlFor="firstName">First Name</TkLabel>
                <TkInput id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <TkLabel htmlFor="lastName">Last Name</TkLabel>
                <TkInput id="lastName" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <TkLabel htmlFor="formEmail">Email</TkLabel>
              <TkInput id="formEmail" type="email" placeholder="john.doe@example.com" />
            </div>

            <div className="space-y-2">
              <TkLabel htmlFor="role">Role</TkLabel>
              <TkSelect>
                <TkSelectTrigger id="role">
                  <TkSelectValue placeholder="TkSelect a role" />
                </TkSelectTrigger>
                <TkSelectContent>
                  <TkSelectItem value="admin">Administrator</TkSelectItem>
                  <TkSelectItem value="user">User</TkSelectItem>
                  <TkSelectItem value="viewer">Viewer</TkSelectItem>
                </TkSelectContent>
              </TkSelect>
            </div>

            <div className="space-y-2">
              <TkLabel htmlFor="bio">Bio</TkLabel>
              <TkTextarea id="bio" placeholder="Tell us about yourself..." className="min-h-24" />
            </div>

            <div className="flex items-center space-x-2">
              <TkCheckbox id="formTerms" />
              <TkLabel htmlFor="formTerms" className="font-normal cursor-pointer">
                I agree to the terms and conditions
              </TkLabel>
            </div>

            <div className="flex gap-2 pt-2">
              <TkButton type="submit">Submit</TkButton>
              <TkButton type="button" variant="outline">Cancel</TkButton>
            </div>
          </form>
        </TkCardContent>
      </TkCard>
    </TkPageWrapper>
  );
}
