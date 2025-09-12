import { createClient } from '@sanity/client'

// Create a client for migration
const client = createClient({
  projectId: "cmn648mb", // Your project ID
  dataset: "production", // Your dataset is production
  useCdn: false,
  token: "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU", // Hardcoded token
  apiVersion: "2024-01-01",
})

async function migrateServiceFields() {
  console.log('Starting service field migration...')
  
  try {
    // Fetch all services that have the old 'subtitle' field
    const services = await client.fetch(`
      *[_type == "service" && defined(subtitle)] {
        _id,
        _rev,
        title,
        subtitle
      }
    `)
    
    console.log(`Found ${services.length} services to migrate`)
    
    if (services.length === 0) {
      console.log('No services found with subtitle field. Migration may already be complete.')
      return
    }
    
    // Create transaction for batch update
    const transaction = client.transaction()
    
    services.forEach((service: { _id: string; title: string; subtitle: string }) => {
      console.log(`Migrating service: ${service._id}`)
      
      // Patch each service to:
      // 1. Move 'subtitle' value to 'title' 
      // 2. Move 'title' value to 'shortDescription'
      // 3. Remove the old 'subtitle' field
      transaction.patch(service._id, {
        set: {
          title: service.subtitle, // Old subtitle becomes new title
          shortDescription: service.title, // Old title becomes new shortDescription
        },
        unset: ['subtitle'] // Remove the old subtitle field
      })
    })
    
    // Execute the transaction
    const result = await transaction.commit()
    console.log('Migration completed successfully!')
    console.log(`Updated ${services.length} documents`)
    
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

// Run the migration
migrateServiceFields()
  .then(() => {
    console.log('✅ Service field migration completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  })
