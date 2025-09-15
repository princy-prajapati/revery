import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function SignOutButton({ onSignOut }: { onSignOut?: () => void }) {
  const handleSignOut = async () => {
    await signOut(auth);
    if (onSignOut) onSignOut();
  };
  return (
    <Button onClick={handleSignOut} variant="outline">
      Sign out
    </Button>
  );
}
