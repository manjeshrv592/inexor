import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cmn648mb", // Your project ID
  dataset: "production", // Your dataset is production
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU", // Hardcoded token
  apiVersion: "2024-01-01",
});

async function deleteBlogContent() {
  console.log("🗑️ Starting to delete all blog content from Sanity...");

  try {
    // Delete all blog posts
    console.log("📝 Deleting blog posts...");
    const blogPosts = await client.fetch(`*[_type == "blogPost"] { _id }`);
    for (const post of blogPosts) {
      await client.delete(post._id);
      console.log(`✅ Deleted blog post: ${post._id}`);
    }

    // Delete all blog categories
    console.log("📂 Deleting blog categories...");
    const blogCategories = await client.fetch(
      `*[_type == "blogCategory"] { _id }`,
    );
    for (const category of blogCategories) {
      await client.delete(category._id);
      console.log(`✅ Deleted blog category: ${category._id}`);
    }

    // Delete resources page settings
    console.log("⚙️ Deleting resources page settings...");
    const resourcesPages = await client.fetch(
      `*[_type == "resourcesPage"] { _id }`,
    );
    for (const page of resourcesPages) {
      await client.delete(page._id);
      console.log(`✅ Deleted resources page: ${page._id}`);
    }

    console.log("🎉 All blog content deleted successfully!");
    console.log("\n📋 Summary:");
    console.log(`- Deleted ${blogPosts.length} blog posts`);
    console.log(`- Deleted ${blogCategories.length} blog categories`);
    console.log(`- Deleted ${resourcesPages.length} resources page settings`);
  } catch (error) {
    console.error("❌ Error deleting blog content:", error);
    process.exit(1);
  }
}

// Run the deletion script
deleteBlogContent();
