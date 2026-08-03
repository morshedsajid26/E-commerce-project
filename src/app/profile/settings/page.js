'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  MapPin, 
  Phone, 
  Lock, 
  ArrowLeft, 
  PlusCircle, 
  LogOut, 
  Loader2, 
  ShieldCheck,
  Save,
  ShoppingBag,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  FileText,
  Camera,
  Shield
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { 
  updateCustomerProfileAction 
} from "@/lib/actions/online-customer.actions";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, setUser } = useAuth();
  
  // Local Customer Data
  const [customer, setCustomer] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [saving, setSaving] = useState(false);

  // Address console management states
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [newAddressText, setNewAddressText] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Load customer details
  const loadCustomerData = () => {
    try {
      if (!user) {
        toast.error("Please sign in to view your profile settings");
        router.push("/login");
        return;
      }
      setCustomer(user);
      setName(user.name || "");
      setProfilePicture(user.profilePicture || "");
      
      // Safe JSON parsing of multiple addresses
      if (user.address) {
        try {
          const parsed = JSON.parse(user.address);
          if (Array.isArray(parsed)) {
            setAddresses(parsed);
          } else {
            setAddresses([user.address]);
          }
        } catch (e) {
          setAddresses([user.address]);
        }
      } else {
        setAddresses([]);
      }
    } catch (e) {
      toast.error("Failed to load customer profile details");
    } finally {
      setLoadingCustomer(false);
    }
  };

  useEffect(() => {
    // Only load data if user is present
    if (user) {
      loadCustomerData();
    } else {
      // Small timeout to allow auth context to hydrate
      const timeout = setTimeout(() => {
        if (!user) {
          toast.error("Please sign in to view your profile settings");
          router.push("/login");
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!name || !name.trim()) {
      return toast.error("Full name is required");
    }

    let finalAddresses = [...addresses];
    
    // Auto-commit any unsaved text in the "+ Add Address" textarea
    if (newAddressText && newAddressText.trim()) {
      finalAddresses.push(newAddressText.trim());
      setAddresses(finalAddresses);
      setNewAddressText("");
      setIsAddingNew(false);
      toast.success("Added your typed address to list before saving!");
    }

    // Auto-commit any active inline edits
    if (editingIndex !== null && editingContent && editingContent.trim()) {
      finalAddresses[editingIndex] = editingContent.trim();
      setAddresses(finalAddresses);
      setEditingIndex(null);
      setEditingContent("");
      toast.success("Committed your active address edits before saving!");
    }

    setSaving(true);
    try {
      const result = await updateCustomerProfileAction(name, finalAddresses, profilePicture);
      if (result.success) {
        const updatedUser = { ...user, ...result.customer };
        setCustomer(updatedUser);
        setUser(updatedUser);
        toast.success("Profile saved successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile settings");
    } finally {
      setSaving(false);
    }
  };
  // Helper to save to DB immediately
  const saveToDB = async (latestAddresses, latestProfilePicture = profilePicture) => {
    setSaving(true);
    try {
      const result = await updateCustomerProfileAction(name || customer?.name || "", latestAddresses, latestProfilePicture);
      if (result.success) {
        const updatedUser = { ...user, ...result.customer };
        setCustomer(updatedUser);
        setUser(updatedUser);
        toast.success("Profile addresses updated!");
        return true;
      }
    } catch (error) {
      toast.error(error.message || "Failed to update addresses");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Add a new address to the local state list
  const handleAddNewAddress = async () => {
    if (!newAddressText || !newAddressText.trim()) {
      return toast.error("Please type a valid delivery address");
    }
    const newList = [...addresses, newAddressText.trim()];
    setAddresses(newList);
    setNewAddressText("");
    setIsAddingNew(false);
    await saveToDB(newList);
  };

  // Start editing an address
  const startEditingAddress = (index) => {
    setEditingIndex(index);
    setEditingContent(addresses[index]);
  };

  // Save the modified address inline
  const saveEditedAddress = async (index) => {
    if (!editingContent || !editingContent.trim()) {
      return toast.error("Address content cannot be empty");
    }
    const newList = [...addresses];
    newList[index] = editingContent.trim();
    setAddresses(newList);
    setEditingIndex(null);
    setEditingContent("");
    await saveToDB(newList);
  };

  // Delete an address from the local state list
  const handleDeleteAddress = async (index) => {
    const newList = addresses.filter((_, i) => i !== index);
    setAddresses(newList);
    await saveToDB(newList);
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (e) {
      toast.error("Sign out failed");
    }
  };

  // Handle profile image file selection & canvas-based base64 downscaling/compression
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 256;
        const MAX_HEIGHT = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        setProfilePicture(compressedBase64);
        toast.success("Profile image ready! Remember to save changes.");
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  // Remove profile picture
  const handleRemoveImage = () => {
    setProfilePicture("");
    toast.success("Profile picture removed! Remember to save changes.");
  };

  if (loadingCustomer) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-medical-blue-600 mb-2" />
        <span className="text-slate-500 font-bold text-sm">Loading your profile portal...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-xl shadow-slate-100/50">
            <div className="flex flex-col md:flex-row items-center gap-6 border-b border-slate-100 pb-8 mb-6">
              {/* Profile Picture Upload UI */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-slate-50 shadow-md flex items-center justify-center overflow-hidden bg-slate-100 ring-2 ring-slate-100 relative transition-transform duration-300">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-300 text-4xl sm:text-5xl font-black uppercase">
                      {name ? name.charAt(0) : "C"}
                    </span>
                  )}
                </div>

                <label className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-medical-blue-600 hover:bg-medical-blue-700 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-200 border-2 border-white">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="text-center md:text-left flex-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-2">Personal Details</h2>
                <div className="flex flex-col md:flex-row items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-medical-blue-50 text-medical-blue-700 border border-medical-blue-100 capitalize">
                    <Shield size={12} />
                    Customer
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <label className="py-2 px-3 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-700 cursor-pointer transition-all flex items-center gap-1">
                    <Camera size={13} />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {profilePicture && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="py-2 px-3 text-xs font-bold bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-100 text-rose-600 transition-all flex items-center gap-1"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* Part 1: General Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="E.g., Sajid Morshed" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full h-12 pl-11 pr-4 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-medical-blue-500/10 focus:border-medical-blue-500 outline-none font-semibold text-slate-800 transition-all"
                    />
                  </div>
                </div>

                {/* Phone (Read Only) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 flex items-center gap-1">
                    <span>Mobile Number</span>
                    <Lock size={12} className="text-slate-400" />
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                      type="tel" 
                      value={customer?.phone || ""} 
                      disabled
                      className="w-full h-12 pl-11 pr-4 border border-slate-100 bg-slate-50 text-slate-400 rounded-xl text-sm font-semibold cursor-not-allowed outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Part 2: Saved Delivery Addresses (Console Grid) */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-medical-blue-600 w-5 h-5" />
                    <h3 className="text-base font-extrabold text-slate-900">Saved Delivery Locations</h3>
                  </div>
                  
                  <button 
                    type="button"
                    onClick={() => setIsAddingNew(true)}
                    className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg text-xs font-bold text-medical-blue-600 bg-medical-blue-50 hover:bg-medical-blue-100 transition-all"
                  >
                    <Plus size={14} />
                    <span>Add Address</span>
                  </button>
                </div>

                {/* Add new address inline box */}
                {isAddingNew && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-medical-blue-100 space-y-3 animate-in slide-in-from-top duration-200">
                    <span className="block text-xs font-bold text-slate-600">Register New Address</span>
                    <textarea 
                      placeholder="Type your new delivery address here (House, Flat, Street, Area, City)..."
                      value={newAddressText}
                      onChange={(e) => setNewAddressText(e.target.value)}
                      className="w-full min-h-[70px] p-3 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-medical-blue-500 outline-none font-semibold text-slate-800 bg-white resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        type="button" 
                        onClick={() => { setIsAddingNew(false); setNewAddressText(""); }}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-all font-bold text-xs"
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        onClick={handleAddNewAddress}
                        className="px-3 py-1.5 rounded-lg bg-medical-blue-600 text-white hover:bg-medical-blue-700 transition-all font-bold text-xs"
                      >
                        Add to List
                      </button>
                    </div>
                  </div>
                )}

                {/* Addresses List display */}
                {addresses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {addresses.map((addr, idx) => (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-2xl border transition-all ${
                          editingIndex === idx 
                            ? "bg-slate-50 border-medical-blue-200" 
                            : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
                        }`}
                      >
                        {editingIndex === idx ? (
                          <div className="space-y-3">
                            <span className="block text-xs font-bold text-slate-500">Edit Address #{idx + 1}</span>
                            <textarea 
                              value={editingContent}
                              onChange={(e) => setEditingContent(e.target.value)}
                              className="w-full min-h-[70px] p-2.5 border border-medical-blue-300 focus:border-medical-blue-500 rounded-xl text-xs outline-none font-semibold text-slate-800 bg-white resize-none"
                            />
                            <div className="flex justify-end gap-2">
                              <button 
                                type="button" 
                                onClick={() => setEditingIndex(null)}
                                className="p-1.5 rounded-lg bg-slate-200 text-slate-500 hover:bg-slate-300 transition-all"
                                title="Cancel"
                              >
                                <X size={14} />
                              </button>
                              <button 
                                type="button" 
                                onClick={() => saveEditedAddress(idx)}
                                className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all"
                                title="Update Address"
                              >
                                <Check size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <MapPin size={16} />
                              </div>
                              <div className="space-y-1">
                                <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-wide">
                                  Location #{idx + 1}
                                </span>
                                <p className="text-xs font-semibold text-slate-700 leading-relaxed break-words">{addr}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button 
                                type="button"
                                onClick={() => startEditingAddress(idx)}
                                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors border border-slate-100"
                                title="Edit Location"
                              >
                                <Edit2 size={12} />
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleDeleteAddress(idx)}
                                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors border border-red-100"
                                title="Delete Location"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center">
                    <MapPin className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                    <h4 className="font-extrabold text-slate-600 text-xs">No address registered</h4>
                    <p className="text-slate-400 text-[10px] mt-0.5 max-w-[200px] mx-auto">
                      Please register at least one home delivery address. Orders cannot be created without it!
                    </p>
                  </div>
                )}
              </div>

              {/* Security info card */}
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/50">
                <ShieldCheck size={18} className="text-medical-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-500 leading-normal">
                  Pressing **Save Changes** updates your permanent profile. Make sure to finalize edits here to synchronize your active checkout shipping list!
                </span>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 h-12 bg-medical-blue-600 hover:bg-medical-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-medical-blue-600/15 disabled:opacity-50 transition-all text-sm"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
    </div>
  );
}
