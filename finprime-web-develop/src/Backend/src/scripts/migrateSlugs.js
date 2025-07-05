const mysql = require('mysql2/promise');
const slugify = require('slugify');
const db = require("../config/db").promise();

async function convertToSlug(topic) {
  return slugify(topic, {
    lower: true,       // Convert to lowercase
    strict: true,      // Remove special characters
    locale: 'en',      // Language rules (optional)
    trim: true         // Remove leading/trailing spaces
  });
}

async function migrateSlugs() {
  try {
    // Get all blogs
    const [blogs] = await db.query('SELECT id, topic FROM blogs');

    for (const blog of blogs) {
      const baseSlug = await convertToSlug(blog.topic);
      let newSlug = baseSlug;
      let counter = 1;

      // Check for existing slugs
      while (true) {
        const [existing] = await db.query(
          'SELECT id FROM blogs WHERE blog_slug = ?',
          [newSlug]
        );

        if (existing.length === 0) break;
        newSlug = `${baseSlug}-${counter++}`;
      }

      await db.query(
        'UPDATE blogs SET blog_slug = ? WHERE id = ?',
        [newSlug, blog.id]
      );
      console.log(`Migrated blog ${blog.id} to slug: ${newSlug}`);
    }

    // Add unique constraint after migration
    await db.query(`
      ALTER TABLE blogs 
      MODIFY blog_slug VARCHAR(255) NOT NULL,
      ADD UNIQUE INDEX blog_slug_unique (blog_slug)
    `);
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await db.end();
  }
}

migrateSlugs();