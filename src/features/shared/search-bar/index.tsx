"use client"

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Command } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { CommandInput, CommandList } from "cmdk";
import { ProductProps } from "@/features/helpers/interfaces/product-props";
import SearchSuccession from "./search-succession";
import SearchResults from "./search-results";
import { searchProduct } from "@/features/utils/actions/search-product";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function SearchBar() {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<ProductProps[]>();


    

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) {
                setIsLoading(true);
                (async () => {
                    try {
                        const result = await searchProduct(searchQuery)
                        setSearchResults(result);
                    } catch (error) {
                        console.error("Error searching products:", error);
                    }
                    finally {
                        setIsLoading(false);
                    }
                })();
            }
            else {
                setSearchResults([]);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search Products...</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                 <DialogTitle>
                    Search Products
                 </DialogTitle>
                 <Command>
                    <CommandInput placeholder="Search..." value={searchQuery} onValueChange={setSearchQuery}/>
                    <CommandList>
                        {
                            isLoading ? (
                                <div className="flex items-center justify-center h-24">
                                    <span>Loading...</span>
                                </div>
                            ) : searchQuery.trim() === "" ? (
                                    <SearchSuccession />
                            ) : searchResults && searchResults.length > 0 ? (
                                    <SearchResults result={searchResults}/>
                            ) : (
                                <div className="flex items-center justify-center h-24">
                                    <span>No results found.</span>
                                </div>
                            )
                        }
                    </CommandList>
                 </Command>
            </DialogContent>
        </Dialog>
    );
}