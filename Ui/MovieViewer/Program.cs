using MovieViewer;
using MovieViewer.Implementation;
using MovieViewer.Interfaces;
using MovieViewer.Types;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient(StatisValues.TheMoviesDatabaseClientName, httpClient =>
{
    httpClient.BaseAddress = new Uri(builder.Configuration["TheMoviesDatabaseClientEndpoint"]);
});
builder.Services.AddTransient<IExternalServiceConnector, ExternalServiceConnector>();

builder.Services.AddControllersWithViews();
builder.Services.Configure<ExternalServiceConfiguration>(builder.Configuration.GetSection(StatisValues.ExternalServiceConfigurationName));


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
