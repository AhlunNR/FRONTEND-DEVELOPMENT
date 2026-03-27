import { useState, useEffect } from "react";
import DesktopTransactions from "./components/DesktopTransactions";
import MobileTransactions from "./components/MobileTransactions";
import { dummyTransactions } from "@/lib/mockData";

export default function Transactions() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredTransactions = dummyTransactions.filter((trx) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (trx.name && trx.name.toLowerCase().includes(searchLower)) ||
      trx.category.toLowerCase().includes(searchLower) ||
      (trx.notes && trx.notes.toLowerCase().includes(searchLower))
    );
  });

  return isDesktop ? (
    <DesktopTransactions
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      filteredTransactions={filteredTransactions}
    />
  ) : (
    <MobileTransactions
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      filteredTransactions={filteredTransactions}
    />
  );
}