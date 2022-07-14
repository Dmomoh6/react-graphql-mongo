const CustomFilters = (props: any) => {
  return (
    <section className="container mx-auto ">
      <div className="flex my-10 mx-auto">
        <button
          type="button"
          onClick={() => props.handleTypeFilter("All")}
          className=" flex-1 text-white ml-3 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300   font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
        >
          All
        </button>
        <button
          type="button"
          onClick={() => props.handleTypeFilter("Cash")}
          className=" flex-1 text-white ml-3 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
        >
          Cash
        </button>
        <button
          type="button"
          onClick={() => props.handleTypeFilter("Cheque")}
          className=" flex-1 text-white ml-3  bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Cheque
        </button>
        <button
          type="button"
          onClick={() => props.handleTypeFilter("Bank Transfer")}
          className=" flex-1 text-white ml-3 mr-3 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Bank Transfer
        </button>
      </div>
    </section>
  );
};

export default CustomFilters;
