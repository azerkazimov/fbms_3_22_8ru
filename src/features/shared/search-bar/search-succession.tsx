import { CommandGroup, CommandItem } from "@/components/ui/command";
import { CommandSeparator } from "cmdk";
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";

export default function SearchSuccessionr() {
    return (
        <div>
            <CommandGroup heading="Succession">
                <CommandItem>
                    <Calendar />
                    <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                    <Smile />
                    <span>Smile</span>
                </CommandItem>
                <CommandItem>
                    <Calculator />
                    <span>Calculator</span>
                </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
                <CommandItem>
                    <User />
                    <span>User</span>
                </CommandItem>
                <CommandItem>
                    <CreditCard />
                    <span>CreditCard</span>
                </CommandItem>
                <CommandItem>
                    <Settings />
                    <span>Settings</span>
                </CommandItem>
            </CommandGroup>
        </div>
    );
}