import React, { useState, useMemo } from "react";
import { Filter, Calendar, User, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/types/blog";
import mockBlogPosts from "@/Data/MockBlogPosts/MockBlogPosts";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";

// Get unique categories for filtering
const allCategories = [
  "All",
  ...Array.from(new Set(mockBlogPosts.map((post) => post.category))),
];

// --- [ Individual Blog Card Component ] ---
const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="bg-card rounded-md  border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1">
    <Link to={`/blog/${post.slug}`} className="block">
      {/* Image Section */}
      <div className="h-48 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-5 space-y-3">
        {/* Category Badge */}
        <span className="badge bg-primary/20 text-primary font-semibold text-xs border-primary/50">
          {post.category}
        </span>

        {/* Title and Excerpt */}
        <h3 className="text-xl font-bold text-foreground line-clamp-2 hover:text-destructive transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
          <span className="flex items-center">
            <User className="w-3 h-3 mr-1" /> {post.author}
          </span>
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" /> {post.date}
          </span>
        </div>
      </div>
    </Link>
  </div>
);

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- [ Filtering Logic ] ---
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") {
      return mockBlogPosts;
    }
    return mockBlogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  const featuredPost = mockBlogPosts[0]; // Assuming the latest post is the featured one

  return (
    <div className="p-4 sm:p-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* --- [ 1. Header & Featured Post Banner ] --- */}
        <div className="pt-8 mb-4 border-b pb-4 border-border">
          <h1 className="text-5xl font-extrabold text-primary mb-2 flex items-center">
            <BookOpen className="w-10 h-10 mr-3 text-destructive" />{" "}
            BloodConnect Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Latest articles on health, donation facts, and community stories.
          </p>
        </div>

        {/* --- [ 2. Featured Post Section ] --- */}
        {featuredPost && (
          <div className="bg-card p-6 md:p-10 rounded-xl shadow-2xl border border-primary/20 flex flex-col lg:flex-row gap-8 transition-all duration-300">
            <div className="lg:w-1/2 overflow-hidden rounded-lg shadow-xl">
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="lg:w-1/2 space-y-4">
              <p className="text-sm font-semibold text-destructive uppercase">
                Featured Article
              </p>
              <h2 className="text-4xl font-extrabold text-foreground hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-lg text-muted-foreground line-clamp-4">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" /> {featuredPost.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" /> {featuredPost.date}
                </span>
                <Label className="bg-primary/20 text-primary py-1 px-3 rounded font-semibold">
                  {featuredPost.category}
                </Label>
              </div>

              <Link to={`/blog/${featuredPost.slug}`}>
                <Button> Read Full Article </Button>
              </Link>
            </div>
          </div>
        )}

        {/* --- [ 3. Filter & Blog Grid ] --- */}
        <div className="space-y-6 pt-6">
          <h2 className="text-3xl font-bold text-foreground">
            Latest Insights
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-secondary/50">
            <Filter className="w-5 h-5 text-primary shrink-0" />
            {allCategories.map((cat) => (
              <Button
                variant={"outline"}
                key={cat}
                onClick={() => setSelectedCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>

          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            ) : (
              <p className="text-lg text-muted-foreground col-span-full py-10 text-center">
                No articles found in this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
