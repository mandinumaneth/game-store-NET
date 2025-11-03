using GameStore.API.Data;
using GameStore.API.Endpoints;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        // Allow both standard Vite dev ports (5173 and 5174) so the frontend
        // can run on either without CORS errors during development.
        policy => policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
    );
});

var connString = builder.Configuration.GetConnectionString("GameStore");
builder.Services.AddDbContext<GameStoreContext>(options =>
    options.UseNpgsql(connString));


var app = builder.Build();

// Use CORS first - this applies to ALL requests including static files
app.UseCors("AllowFrontend");

// Enable static files after CORS so they get CORS headers
app.UseStaticFiles();

app.MapGamesEndpoints();
app.MapGenresEndpoints();

// Image upload endpoint
app.MapPost("/upload", async (HttpRequest request) =>
{
    var form = await request.ReadFormAsync();
    var file = form.Files["image"];

    if (file == null || file.Length == 0)
    {
        return Results.BadRequest("No file uploaded");
    }

    // Validate file type
    var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
    var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

    if (!allowedExtensions.Contains(extension))
    {
        return Results.BadRequest("Invalid file type. Only images are allowed.");
    }

    // Generate unique filename
    var fileName = $"{Guid.NewGuid()}{extension}";
    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

    // Ensure directory exists
    Directory.CreateDirectory(uploadsFolder);

    var filePath = Path.Combine(uploadsFolder, fileName);

    // Save file
    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    // Return the URL path
    var imageUrl = $"/images/{fileName}";
    return Results.Ok(new { imageUrl });
});

// Image delete endpoint - using /api/images to avoid conflict with static files
app.MapDelete("/api/images/{fileName}", (string fileName) =>
{
    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

    if (File.Exists(filePath))
    {
        File.Delete(filePath);
        return Results.Ok(new { message = "Image deleted successfully" });
    }

    return Results.NotFound(new { message = "Image not found" });
});

await app.MigrateDbAsync();

app.Run();
