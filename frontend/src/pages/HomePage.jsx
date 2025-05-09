import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight, Share2, Bookmark, MoreVertical } from "lucide-react";
import ProfileDropdown from "../components/ProfileDropdown";
const InfoCard = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 rounded-2xl shadow-xl bg-[#E4DFDA]">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="w-48 h-48 bg-gray-300 rounded-lg" />
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <Share2 className="text-[#504B3A] cursor-pointer" />
          <Bookmark className="text-[#504B3A] cursor-pointer" />
          <MoreVertical className="text-[#504B3A] cursor-pointer" />
        </div>

        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <ArrowLeft className="text-[#69995D] cursor-pointer" />
        </div>

        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <ArrowRight className="text-[#69995D] cursor-pointer" />
        </div>
      </div>

      <Card className="rounded-none border-t border-[#504B3A]">
        <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center text-[#504B3A]">
          <div className="text-lg font-medium">$0</div>
          <div className="text-sm text-right">
            All the necessary options
            <br />
            and contact details
          </div>
        </CardContent>
        <CardContent className="pb-6 px-6 text-sm text-[#504B3A]">
          You guys can change the length if you think it is needed
        </CardContent>
      </Card>
    </div>
  );
};

const SponsoredSection = () => {
  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-[#504B3A] text-lg font-semibold mb-4">Sponsored PGs (ads)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="w-full h-40 bg-gray-200 rounded-xl"
          ></div>
        ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-[#504B3A] text-lg font-semibold mb-4">Testimonials</h2>
      <div className="flex items-center gap-3 mb-6">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full bg-yellow-300 border-2 border-white"
          ></div>
        ))}
        <span className="text-sm text-[#69995D] font-medium">+1</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <Card
            key={i}
            className="p-4 bg-[#E4DFDA] text-[#504B3A] rounded-xl shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="text-sm font-semibold">Title</div>
            </div>
            <p className="text-xs text-[#504B3A]">Description</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <div className="flex justify-end gap-4 p-4">
        <Button
          className="bg-[#69995D] text-white hover:bg-[#587f4e]"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          className="bg-[#69995D] text-white hover:bg-[#587f4e]"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
        {/* Include ProfileDropdown */}
        <ProfileDropdown profileImage="/api/placeholder/40/40" />
      </div>
      <InfoCard />
      <SponsoredSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
