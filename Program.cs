using Microsoft.EntityFrameworkCore;
using StudentManagementAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// Configure CORS from appsettings
builder.Services.AddCors(options =>
{
    var corsPolicies = builder.Configuration.GetSection("CorsPolicy");
    
    foreach (var policy in corsPolicies.GetChildren())
    {
        var origins = policy.GetSection("Origins").Get<string[]>() ?? Array.Empty<string>();
        var methods = policy.GetSection("Methods").Get<string[]>() ?? new[] { "GET", "POST", "PUT", "DELETE" };
        var headers = policy.GetSection("Headers").Get<string[]>() ?? new[] { "Content-Type" };
        var allowCredentials = policy.GetSection("AllowCredentials").Get<bool>();

        options.AddPolicy(policy.Key, policyBuilder =>
        {
            policyBuilder.WithOrigins(origins)
                        .WithMethods(methods)
                        .WithHeaders(headers);

            if (allowCredentials)
            {
                policyBuilder.AllowCredentials();
            }
        });
    }
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable Swagger in all environments
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
