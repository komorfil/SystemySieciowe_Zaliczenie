using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.Models;

namespace WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Konfiguracja i usługi składnika Web API

            // Konfiguracja CORS
            var corsPolicy = new EnableCorsAttribute("http://localhost:4200", "*", "*");
            corsPolicy.SupportsCredentials = true;
            config.EnableCors(corsPolicy);

            // Ustawienia formatterów
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/json"));

            // Pobranie Connection String
            var connectionString = "Data Source=.;Initial Catalog=EmployeeDB;Integrated Security=True";

            // Rejestracja kontekstu bazy danych
            var services = new ServiceCollection();
            services.AddDbContext<UserContext>(options =>
                options.UseSqlServer(connectionString));
            services.AddScoped<UserContext>();

            var serviceProvider = services.BuildServiceProvider();

            // Pobranie instancji kontekstu bazy danych
            var userContext = serviceProvider.GetRequiredService<UserContext>();

            // Konfiguracja tras
            config.MapHttpAttributeRoutes();

            // Trasa dla akcji tworzenia użytkownika
            config.Routes.MapHttpRoute(
                name: "CreateUserApi",
                routeTemplate: "api/User/CreateUser",
                defaults: new { controller = "User", action = "CreateUser" }
            );

            // Trasa dla akcji logowania
            config.Routes.MapHttpRoute(
                name: "LoginUserApi",
                routeTemplate: "api/User/LoginUser",
                defaults: new { controller = "User", action = "LoginUser" }
            );

            // Inne konfiguracje...
        }
    }
}
