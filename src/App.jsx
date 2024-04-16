import React, { useEffect, useState } from "react";
import data from "./records.json";
import InfiniteScroll from "react-infinite-scroll-component";

const App = () => {
  const [searchedCollege, setSearchCollege] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("fees"); // Default sorting by fees
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const itemsPerPage = 10; // Adjust as needed

  useEffect(() => {
    const fetchData = async () => {
      const filteredData = data.filter((res) =>
        res.collegeName.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchCollege(filteredData.slice(0, itemsPerPage)); // Initial data
    };

    fetchData();
  }, [searchText]);

  const sortData = (dataToSort) => {
    return dataToSort.sort((a, b) => {
      let comparison = 0;
      if (sortOrder === "asc") {
        // Handle string sorting (adjust for other property types)
        if (sortBy === "collegeName") {
          comparison = a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
        } else {
          comparison = a[sortBy] - b[sortBy];
        }
      } else {
        // Reverse logic for descending order
        if (sortBy === "collegeName") {
          comparison = b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
        } else {
          comparison = b[sortBy] - a[sortBy];
        }
      }
      return comparison;
    });
  };

  const handleSort = (selectedSortBy) => {
    if (selectedSortBy === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(selectedSortBy);
      setSortOrder("asc");
    }

    // Re-sort the entire dataset after changing sort criteria
    setSearchCollege(sortData(searchedCollege.slice())); // Create a copy to avoid mutation
  };

  const fetchMoreData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (startIndex >= data.length) {
      setHasMore(false);
      return;
    }

    const filteredData = data.filter((res) =>
      res.collegeName.toLowerCase().includes(searchText.toLowerCase())
    );
    const newData = filteredData.slice(startIndex, endIndex);

    setSearchCollege((prevCollege) => [...prevCollege, ...newData]);
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="flex justify-around">
        <div className="items-center">
          <input
            type="text"
            placeholder="Enter college name"
            className="p-2 m-2 rounded-3xl bg-white w-100 items-center"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 rounded-lg p-2"
            onClick={() => {
              const filteredCollege = data.filter((res) => {
                return res.collegeName
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setSearchCollege(filteredCollege);
            }}
          >
            Search
          </button>
        </div>
        <div className="sort-selection m-4">
          <label htmlFor="sort">Sort By:</label>
          <select
            name="sort"
            id="sort"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="fees">Fees</option>
            <option value="ranking">CD Rank</option>
            <option value="review">User Review</option>
            <option value="collegeName">College Name</option>
          </select>
          <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "▲" : "▼"}
          </button>
        </div>
      </div>
      <InfiniteScroll
        dataLength={searchedCollege.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="p-5 h-screen bg-gray-100">
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-400 border-b-2 border-gray-200">
                <tr>
                  <th className="w-15 p-3 text-sm font-semibold tracking-wide text-left">
                    CD Rank
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Colleges
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                    Course Fees
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Placement
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    User Review
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Ranking
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
              {searchedCollege.map((item,index)=>{
                return ( <tr className="bg-white" key={index}>
              
                <><td className="p-3 text-sm text-gray-700 whitespace-nowrap w-1/12">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                  #{item.ranking}
                </a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap w-4/12">
               <span className="inline-flex gap-3">
                <img src={item.image}  className="h-max-15"/>
                <div><p className="text-xl text-blue-400"> 
                  {item.collegeName}</p>
                <sub>{item.location}</sub>
                </div>
                </span>
                
               
                
                <div className="flex justify-between">
                  <button className="m-4 text-green-600"><i class="fa-solid fa-arrow-right"></i> Apply Now</button>
                  <button className=""> <i className="fa-solid fa-download"></i> Download Brochure</button>
                  <div>
                  <input
                    type="checkbox"
                    value="Add To Compare"
                    className="m-2 p-2 mt-5"
                    />
                    <label>Add to Compare</label>
                    </div>
                </div>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a href="" >
                  <div className="hover:underline pb-2">
                  <div className="text-green-700 font-semibold"> <i class="fa-solid fa-indian-rupee-sign"></i> {item.courseFees}</div>
                  <div>BE/Btech</div>
                  <div>-1st Year Fees</div>
                  </div>  
                  <a href="" className="text-green-600"><i class="fa-solid fa-arrow-right-arrow-left"></i>  Compare Fees</a>
                </a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap w-2/12">
              <a href="" >
                  <div className="hover:underline  pb-2">
                  <div className="text-green-700 font-semibold"> <i class="fa-solid fa-indian-rupee-sign"></i> { item.averagePackage}</div>
                  <div>Average Package</div>
                  </div>  
                  <div className="hover:underline pb-2">
                  <div className="text-green-700 font-semibold">  <i class="fa-solid fa-indian-rupee-sign"></i> {item.highestPackage}</div>
                  <div>Highest Package</div>
                  </div>  
                  <a href="" className="text-green-600"><i class="fa-solid fa-arrow-right-arrow-left"></i> Compare Placements</a>
                </a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <div>
                  <a href="">{item.userReviewScore}</a>
                  <div className="hover:underline">
                  <div>Based on 346 User</div>
                  <div>Reviews</div>
                  </div>
                  <a href="" className="text-green-600 bg-yellow-200 rounded-2xl pl-2 pr-2"><i class="fa-solid fa-check"></i> Best in  Social Life <i class="fa-solid fa-angle-down"></i></a>
                </div>
              </td>
              <td className="w-1/12">
                <div>#{item.ranking}/131 in India</div>
              </td>
              </>
              
            </tr>)
              })}
            
              </tbody>
            </table>
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

 
export default App;
 
