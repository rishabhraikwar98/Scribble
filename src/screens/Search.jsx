import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API } from "../API/API";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon/Icon";
import { MdOutlineClear } from "react-icons/md";
import toast from "react-hot-toast";
import no_user from "../assets/no_user.png";
import Loading from "react-loading";
import { ProfileContext } from "../context/ProfileContext";
import { useSearchParams } from "react-router-dom";
function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  const iconColor = "rgb(55 65 81)";
  const {myProfile} =useContext(ProfileContext)
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRedirect = (user) => {
    if (user._id === myProfile._id) {
      navigate(`/profile/me`);
    } else {
      navigate(`/profile/${user._id}/${user.user_name}`);
    }
  };
  useEffect(() => {
    searchProfiles();
  }, [search]);
  const searchProfiles = async () => {
    try {
      setLoading(true);
      const params = {
        query: search,
      };
      setSearchParams({user_name:search,name:search})
      const res = await axios.get(API.Profile.searchProfiles, {
        params: params,
      });
      setLoading(false);
      setProfiles(res.data.profiles);
    } catch (error) {
      toast.error("Please Try Again Later !");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="search flex justify-center">
        <div className="lg:w-5/12 w-11/12">
          <div className="lg:mt-8 mt-6 lg:py-6 py-4 w-full">
            <p className="lg:text-4xl text-3xl text-gray-800 font-bold">
              Search
            </p>
          </div>
          <div className="relative search-bar">
            <input
              className=" border border-gray-200 w-full lg:px-8 px-6 lg:py-4 py-3.5 lg:text-lg text-gray-800 font-medium rounded-xl bg-gray-100 focus:outline-none"
              placeholder="Search people"
              autoFocus
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
            />
            {search&&<button onClick={()=>setSearch("")} className="absolute bg-gray-200 lg:p-1.5 p-1 rounded-full right-3 lg:top-4 top-3.5 shadow-md">
              <Icon icon={MdOutlineClear} size={16} color={iconColor} />
            </button>}
          </div>
          {search && profiles.length ? (
            <div className="people mt-10">
              <p className="text-xl font-bold text-gray-900">People</p>
              <div className="results mt-5 px-1 overflow-y-auto max-h-[540px] lg:max-h-96">
                {profiles.map((p,index) => {
                  return (
                    <div
                    key={index}
                      onClick={() => {
                        handleRedirect(p);
                      }}
                      className="cursor-pointer flex lg:gap-5 gap-4 lg:px-5 px-3 lg:py-3 py-2.5 items-center rounded-xl hover:bg-gray-100"
                    >
                      <div className="avatar">
                        <img
                          className="lg:w-14 w-12 rounded-full"
                          src={p.avatar || no_user}
                        />
                      </div>
                      <div className="name">
                        <p className="lg:text-lg text-base font-medium text-gray-900 lg:-my-1 -my-0.5">
                          {p.user_name}
                        </p>
                        <p className="lg:text-base text-sm text-gray-500">
                          {p.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
          {!loading && search && !profiles.length && (
            <p className="text-center text-lg mt-10 font-medium text-gray-500">
              No results for '{search}'
            </p>
          )}
          {loading && search && !profiles.length && (
            <div className=" flex mt-10  justify-center">
              <Loading type="bubbles" width={80} color={iconColor} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
