# Twitter Clone

A Full-Stack Twitter Clone.

---

### Setup

1. **Create the Database**

   - Use the SQL schema files in the `/db` directory to create the required PostgreSQL database and tables.

2. **Configure Application Properties**

   - Copy `backend/src/main/resources/application.properties.example` to `application.properties`.
   - Open `backend/src/main/resources/application.properties`.
   - Update the database connection settings:

     ```properties
     # Database configuration
     spring.datasource.url=jdbc:postgresql://localhost:5432/ twitter_clone_db
     spring.datasource.username=<YOUR_DB_USERNAME>
     spring.datasource.password=<YOUR_DB_PASSWORD>
     ```

   - Update the security settings:

     ```properties
     # Security configuration
     jwt.secret=<YOUR_JWT_SECRET>
     ```

   > **Note:** `application.properties` is ignored by Git to protect sensitive data.

---
