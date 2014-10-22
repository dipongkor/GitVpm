using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GitVpm.Startup))]
namespace GitVpm
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
