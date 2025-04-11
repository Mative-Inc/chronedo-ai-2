import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/url";
import Notification from "./notification/Notification";
import FeatureForm from "./features/FeaturesForm";
import FeatureCard from "./home/feature/featureCard";

interface FeatureCard {
  _id?: string;
  image: string;
  stats: string;
  title: string;
  description: string;
  image2: string;
  reverse: boolean;
}

interface HeaderContent {
  title: string;
  subtitle: string;
  description: string;
}

const FeatureSectionUpdate: React.FC = () => {
  const [featureCards, setFeatureCards] = useState<FeatureCard[]>([]);
  const [headerContent, setHeaderContent] = useState<HeaderContent>({
    title: "Highlights our impactful work",
    subtitle: "OUR FEATURES",
    description: "Discover the positive change we've created through our programs, partnerships, and dedicated efforts. From healthcare and education to environmental sustainability."
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showHeaderForm, setShowHeaderForm] = useState(false);
  const [editingCard, setEditingCard] = useState<any>(null);
  const [notification, setNotification] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // Default feature cards data
  const defaultFeatureCards: FeatureCard[] = [
    {   
      image: "/campaign-card.png",
      stats: "96%",
      title: "Healthcare Support",
      description: "Providing essential healthcare services to underserved communities.",
      image2: "/hand-heart.png",
      reverse: false
    },
    {
      image: "/campaign-card.png",
      stats: "94%",
      title: "Education Support",
      description: "Helping children access quality education and learning resources.",
      image2: "/money.png",
      reverse: true
    },
    {
      image: "/campaign-card.png",
      stats: "95%",
      title: "Food Support",
      description: "Delivering nutritious meals to families in need across regions.",
      image2: "/bag.png",
      reverse: false
    }
  ];

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/features`);
        setFeatureCards(res.data.length > 0 ? res.data : defaultFeatureCards);
        setError("");
      } catch (err) {
        setFeatureCards(defaultFeatureCards);
        setError("Using default feature cards as no data is available in the database");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const handleHeaderSubmit = async (content: HeaderContent) => {
    try {
      await axios.post(`${BASE_URL}/features/header`, content, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHeaderContent(content);
      setShowHeaderForm(false);
      showNotification("Success", "Header content updated successfully");
    } catch (err) {
      showNotification("Error", "Failed to update header content");
      console.error(err);
    }
  };

  // ... existing handleDelete, handleEdit, handleSubmit, showNotification, closeNotification functions ...

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-[1200px] mx-auto py-16 px-4 flex flex-col items-center justify-center gap-14 p-10">
      <Notification
        isOpen={notification.isOpen}
        onClose={closeNotification}
        title={notification.title}
        message={notification.message}
      />

      {/* Text Section */}
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/home-header.png" alt="home-header" className="w-[20px] h-[15px]" />
            <p className="text-xs font-normal leading-[15px] text-[#000000] tracking-[3.5px]">
              {headerContent.subtitle}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHeaderForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit Header
            </button>
            <button
              onClick={() => {
                setEditingCard(null);
                setShowForm(true);
              }}
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Add New Feature
            </button>
          </div>
        </div>

        <h1 className="text-4xl text-center font-bold font-onest">
          {headerContent.title}
        </h1>

        <p className="text-xs text-gray-500 leading-relaxed font-sans">
          {headerContent.description}
        </p>
      </div>

      {/* Header Form Modal */}
      {showHeaderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Header Content</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleHeaderSubmit({
                title: formData.get('title') as string,
                subtitle: formData.get('subtitle') as string,
                description: formData.get('description') as string
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    defaultValue={headerContent.subtitle}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={headerContent.title}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    defaultValue={headerContent.description}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowHeaderForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feature Form Modal */}
      {showForm && (
        <FeatureForm
          initialData={editingCard}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingCard(null);
          }}
        />
      )}

      {/* Cards section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureCards.map((card) => (
          <div key={card._id || card.title} className="relative group">
            <FeatureCard {...card} />
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(card)}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => card._id && handleDelete(card._id)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show error message if using default data */}
      {error && (
        <div className="text-yellow-600 bg-yellow-100 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default FeatureSectionUpdate; 