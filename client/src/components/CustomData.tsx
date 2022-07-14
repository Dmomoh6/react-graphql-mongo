import React, { useState, useMemo, useEffect } from "react";
import { filterTransactions, filterTransactionsByType } from "../helpers";
import CustomSearchInput from "./CustomSearchInput";
import CustomFilters from "./CustomFilters";

const CustomData = (props: any) => {
  const [filters, setFilters] = useState({});
  const [types, setTypes] = useState("All");
  const [dates, setDates] = useState<string[]>([]);

  const transactions = useMemo(
    () => filterTransactionsByType(props.data.transaction, types),
    [props.data.transaction, types]
  );

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, filters),
    [transactions, filters]
  );

  const handleSearchSubmit = (value: String, accessor: any) => {
    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {});
    }
  };

  const handleTypeFilter = (value: any) => {
    if (value) {
      setTypes(value);
    } else {
      setTypes("All");
    }
  };

  const onlyUniqueArr = (value: string, index: Number, self: any) => {
    return self.indexOf(value) === index;
  };
  useEffect(() => {
    let result: string[] = [];
    filteredTransactions.map((item: any) => {
      result.push(item.date);
    });
    setDates(result.sort().filter(onlyUniqueArr));
  }, [1]);

  return (
    <>
      <CustomSearchInput handleSearchSubmit={handleSearchSubmit} />
      <CustomFilters handleTypeFilter={handleTypeFilter} />
      <div className="ml-3 mb-5 text-lg relative ">
        Filter: <b>{types}</b>
      </div>

      {dates.map((date) => (
        <div className="ml-3 text-md ">
          <span className="font-bold">{date}</span>
          {filteredTransactions.map((transaction: any) => {
            return (
              transaction.date == date && (
                <div className="ml-3 my-4 relative">
                  <div className="flex">
                    {(transaction.status == "Approved" && (
                      <div className="bg-green-700 flex-none w-32 text-white flex items-center justify-center">
                        Approved
                      </div>
                    )) ||
                      (transaction.status == "Rejected" && (
                        <div className="bg-red-700 flex-none w-32 text-white flex items-center justify-center">
                          Rejected
                        </div>
                      )) ||
                      (transaction.status == "In Progress" && (
                        <div className="bg-yellow-300 flex-none w-32 flex items-center justify-center">
                          In Progress
                        </div>
                      ))}

                    <div className="details px-5 flex-auto">
                      {transaction.name} <br /> {transaction.type} <br />
                      {transaction.id}
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      ))}
    </>
  );
};

export default CustomData;
