using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using React.Entities;
using React.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddNewtonsoftJson();

//MongoDB Configs
var services = builder.Services;
var connectionString = "mongodb://localhost:27017";
var client = new MongoClient(connectionString);
services.AddSingleton<IMongoClient>(client);
services.AddScoped<IAddUser>(provider =>
        new AddUser(provider.GetService<IMongoClient>()));
services.AddScoped<IAddVehicle>(provider=>new AddVehicle(provider.GetService<IMongoClient>()));
services.AddScoped<ICheckLogin>(provider=>
       new CheckLogin(provider.GetService<IMongoClient>()));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


// global cors policy
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials()); // allow credentials

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
