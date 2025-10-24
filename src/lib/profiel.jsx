{/* {currentStep === 5 && (
                        <div className="space-y-6 animate-fade-in-up">
                            <div className="text-center mb-8">
                                <img
                                    src="/icons/Camera.svg"
                                    alt="User Icon"
                                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] mx-auto mb-4"
                                />
                                <h2 className="section-title">Profile Photo</h2>
                                <p className="text-space-text/70">Upload your photo for our facial recognition system</p>

                            </div>

                            <div className="flex flex-col items-center space-y-6">
                                <div className="relative">
                                    {formData.profilePhotoPreview ? (
                                        <div className="relative">
                                            <img
                                                src={formData.profilePhotoPreview || "/placeholder.svg"}
                                                alt="Profile preview"
                                                className="w-48 h-48 rounded-full object-cover border-4 border-space-accent shadow-lg"
                                            />
                                            <button
                                                onClick={() => handleInputChange("profilePhotoPreview", null)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                                            >
                                                <X size={16} color="white" />

                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-48 h-48 rounded-full bg-space-light/10 border-2 border-dashed border-Main-500 flex items-center justify-center">
                                            <div className="text-center">
                                                <Upload className="w-12 h-12 text-space-text/50 mx-auto mb-2" />
                                                <p className="text-space-text/70 text-sm">No photo uploaded</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handlePhotoUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <Button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="gradient-buttons text-white hover:from-space-orange-light hover:to-space-purple px-8 py-3"
                                    >
                                        {formData.profilePhotoPreview ? "Change Photo" : "Upload Photo"}
                                        <Upload className="w-5 h-5 ml-2" />

                                    </Button>
                                    {errors.profilePhoto && <p className="text-error-200 text-sm my-1">* {errors.profilePhoto}</p>}

                                    <p className="text-space-text/60 text-sm mt-2">
                                        Recommended: Clear, front-facing photo for best recognition results
                                    </p>
                                </div>
                            </div>
                        </div>
                    )} */}