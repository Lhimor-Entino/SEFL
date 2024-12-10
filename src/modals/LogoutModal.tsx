import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import useLogout from "@/hooks/api/useLogout";
import { CircleHelpIcon, Loader2Icon } from "lucide-react";

interface Props {
    loggingOut: boolean;
    setLoggingOut: (arg: boolean) => void;

}

const LogoutModal = (props: Props) => {
    const { loggingOut, setLoggingOut } = props
    const { logout, loading } = useLogout()


    return (
        <Dialog open={loggingOut} onOpenChange={() => setLoggingOut(!loggingOut)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">Logout <CircleHelpIcon className="animate-spin-y-5 w-5 h-5" /></DialogTitle>
                    <DialogDescription>

                        Note : You have a pending request. This request will be deallocated.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button type="button" size={"sm"} onClick={() => logout()}> {loading && <Loader2Icon className="animate-spin w-4 h-4 mr-3" />}Logout</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LogoutModal