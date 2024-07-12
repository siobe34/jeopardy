import { buttonVariants } from "@/components/ui/button";

export const clerkAppearance = {
  variables: {
    colorPrimary: "#816471",
    colorShimmer: "#816471",
  },
  elements: {
    modalContent: "bg-background text-foreground",
    userButtonPopoverRootBox: "bg-background text-foreground",
    navbar: "[background:none] bg-background text-foreground",
    navbarMobileMenuRow: "bg-background text-foreground",
    navbarButton: "bg-background text-foreground",
    avatarImageActionsUpload: "bg-background text-foreground",
    badge: "bg-background text-foreground",
    profileSectionItem: "bg-background text-foreground",
    navbarButtons: "bg-background text-foreground",
    scrollBox: "bg-background text-foreground",
    pageScrollBox: "bg-background text-foreground",
    page: "bg-background text-foreground",
    profilePage: "bg-background text-foreground",
    profileSection: "bg-background text-foreground",
    profileSectionContent: "bg-background text-foreground",
    cardBox: "bg-background text-foreground",
    actionCard: "bg-background text-foreground",
    form: "bg-background text-foreground",
    card: "bg-background text-foreground",
    footer: "[background:hsl(var(--background))] text-foreground",
    input:
      "flex h-10 w-full rounded-md !border border-input hover:!border hover:!border-input/80 focus:!border-input/80 bg-background text-foreground px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    formFieldLabel:
      "text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    formFieldSuccessText: "text-foreground",
    footerActionText: "text-foreground",
    footerActionLink: "text-muted-foreground hover:text-muted-foreground",
    formButtonReset: buttonVariants({ variant: "secondary" }),
    userButtonPopoverCard:
      "bg-background text-foreground border border-border shadow-[2px_10px_12px_hsl(var(--background)),-4px_-2px_12px_hsl(var(--base))]",
    userButtonPopoverMain:
      "bg-background text-foreground hover:text-foreground",
    userButtonPopoverActions:
      "bg-background text-foreground hover:text-foreground",
    userButtonPopoverActionButton:
      "bg-background text-foreground hover:text-foreground/85 relative before:absolute before:top-0 before:w-full before:border-muted before:border-t",
    userButtonPopoverFooter:
      "[background:hsl(var(--background))] text-foreground",
    formButtonPrimary: `!shadow-none ${buttonVariants({ variant: "default" })}`,
    formFieldInputShowPasswordButton: buttonVariants({
      variant: "ghost",
    }),
    formFieldInputShowPasswordIcon:
      "text-muted-foreground hover:text-foreground",
    header: "hidden",
  },
};
