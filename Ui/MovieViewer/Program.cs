using MovieViewer.Implementation;
using MovieViewer.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<IExternalServiceConnector, ExternalServiceConnector>();


builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
