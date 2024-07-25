import { FaSearch } from "react-icons/fa";
import { useState,useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { color } from "framer-motion";

function isTokenValid(accessToken,exp,iss) {
  console.log(typeof exp);
  console.log(typeof iss);
  try {
    const currentTime = Math.floor(Date.now()/1000);
    console.log("CURRENT TIME IS ------",currentTime);
    console.log("EXP IS ----",exp);
    console.log("issued at ----",iss);
    console.log("iss + exop",iss+exp);
    console.log(exp + iss > currentTime);
    return (exp + iss) > currentTime;
  } catch (error) {
    console.error("Error validating access token:", error);
    return false;
  }
}

export const Search_Btn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    console.log("Suggestions:", suggestions);
    console.log("suggestions is array",Array.isArray(suggestions));
  }, [suggestions]);

  const fetchAccessToken = async () => {
    const storedToken = localStorage.getItem("accessToken");
    let exp_time = localStorage.getItem("exp");
    let issued_at = localStorage.getItem("issued_at");
  
    if (storedToken != null) {
      // Check if the stored token is valid and not expired
      if (isTokenValid(storedToken,eval(exp_time),eval(issued_at))) {
        console.log("Stored TOKEN IS -----------" + storedToken);
        return storedToken;
      }
    }
    //get a token
    const clientId = import.meta.env.VITE_MAPPLS_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_MAPPLS_CLIENT_SECRET;

    const response = await axios.get(
      "http://127.0.0.1:8000/token"
      // {
      //   grant_type: "client_credentials",
      //   client_id: clientId,
      //   client_secret: clientSecret,
      // }
    );

    const newToken = response.data.access_token;
    exp_time=response.data.expires_in
    issued_at = Math.floor(Date.now()/1000);
    // console.log("RESPONSE IS -----------",response);
    localStorage.setItem("accessToken", (newToken));
    localStorage.setItem("exp",(exp_time));
    localStorage.setItem("issued_at",(issued_at));
    
    // console.log("TOKEN IS -----------" + newToken);
    console.log(JSON.parse(localStorage.getItem("access_token")))
    return newToken;
  };

  const fetchSuggestions = async () => {
    const accessToken = await fetchAccessToken();
    const response = await axios.post(
      "http://127.0.0.1:8000/suggestion/",
      {
        "searchQuery" : searchQuery,
        "token" : accessToken
      }
     
    );
    console.log("Suggesion Response IS ----------",response);
    
    setSuggestions(response.data.suggestedLocations);
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchSuggestions(query);
  };

  const fetchParkings=async (eLoc,token)=>{
    //PASS eloc to nearby api
    const res = await axios.post("http://127.0.0.1:8000/nearby/",{
      "eLoc":eLoc,
      "token":token
    })

    console.log(res);    
    console.log("parkings are");
  }

  return (
    <div className="flex items-center relative sm:left-9 left-7">
      <input
        className="sm:text-2xl  sm:px-8 px-4 rounded-full my-10 border-2 sm:h-16 h-14 w-full border-black"
        type="text"
        placeholder="Search for a spot right now!"
        value={searchQuery}
        onChange={handleSearch}
      />
      <FaSearch
        style={{ backgroundColor: "#0000FF" }}
        className="cursor-pointer relative sm:right-20 right-14 rounded-full text-white sm:px-4 sm:py-4 px-2 py-2 sm:h-12 sm:w-20 h-10 w-14"
      />
      
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}><button onClick={()=>{
            setSearchQuery(suggestion.placeName);
            const eLoc= suggestion.eLoc;

            fetchParkings(eLoc,fetchAccessToken());
          }}>{suggestion.placeName}</button></li> // Ensure to return the JSX
        ))}
        </ul>
      ) : (
        <p>Nothing</p>
      )}

      {/* <button className='bg-blue-700 text-white sm:text-3xl sm:px-8 px-6 py-4 sm:py-4 font-bold rounded-full' style={{backgroundColor: '#0000FF'}}>SEARCH NEAR ME</button> */}
    </div>
  );
};
