"use client";

import React, { useState, useEffect } from "react";
import { getBlogPosts, getBlogPostBySlug, type BlogPost } from "@/lib/sanity/blog";
import { RichTextRenderer } from "@/components/blog";
import { DynamicShape } from "@/components/ui/DynamicShape";
import Image from "next/image";
import { urlForFeaturedImage } from "../../../../sanity/lib/image";

const BlogTestPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await getBlogPosts();
        setBlogPosts(posts);
        
        // Auto-select first post with content
        if (posts.length > 0) {
          const firstPostWithContent = await getBlogPostBySlug(posts[0].slug.current);
          setSelectedPost(firstPostWithContent);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handlePostSelect = async (post: BlogPost) => {
    try {
      const fullPost = await getBlogPostBySlug(post.slug.current);
      setSelectedPost(fullPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-orange-500">
          Blog Image Crop/Hotspot Test
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts List */}
          <div className="lg:col-span-1">
            <h2 className="mb-4 text-xl font-semibold">Blog Posts</h2>
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <DynamicShape
                  key={post._id}
                  fill={selectedPost?._id === post._id ? "#ff6b35" : "#404040"}
                  stroke="none"
                  strokeWidth={0}
                  padding="p-0"
                >
                  <div
                    className="cursor-pointer p-4 transition-opacity hover:opacity-90"
                    onClick={() => handlePostSelect(post)}
                  >
                    {post.featuredImage && (
                      <div className="mb-3">
                        <Image
                          src={urlForFeaturedImage(post.featuredImage, 300, 200).url()}
                          alt={post.featuredImage.alt || post.title}
                          width={300}
                          height={200}
                          className="h-32 w-full object-cover rounded"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-sm mb-2">{post.title}</h3>
                    <p className="text-xs text-gray-400">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </DynamicShape>
              ))}
            </div>
          </div>

          {/* Selected Post Content */}
          <div className="lg:col-span-2">
            {selectedPost ? (
              <div>
                <h2 className="mb-4 text-2xl font-bold">{selectedPost.title}</h2>
                
                {selectedPost.featuredImage && (
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-orange-500">
                      Featured Image (with crop/hotspot applied):
                    </h3>
                    <Image
                      src={urlForFeaturedImage(selectedPost.featuredImage, 600, 400).url()}
                      alt={selectedPost.featuredImage.alt || selectedPost.title}
                      width={600}
                      height={400}
                      className="w-full rounded-lg"
                    />
                  </div>
                )}

                {selectedPost.content && (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-orange-500">
                      Blog Content (images with crop/hotspot + unique shape applied):
                    </h3>
                    <RichTextRenderer content={selectedPost.content} />
                  </div>
                )}

                <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-sm font-semibold text-orange-500 mb-2">
                    🎯 Testing Instructions:
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Go to your Sanity Studio and edit a blog post</li>
                    <li>• Upload an image and use the crop tool to crop it</li>
                    <li>• Set a hotspot by clicking on the image</li>
                    <li>• <strong>NEW:</strong> Toggle the &quot;Grayscale&quot; option on/off for each image</li>
                    <li>• Save the changes and refresh this page</li>
                    <li>• Images should display with crop/hotspot, grayscale settings, AND unique clip-path shape applied!</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <p>Select a blog post to view its content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTestPage;
