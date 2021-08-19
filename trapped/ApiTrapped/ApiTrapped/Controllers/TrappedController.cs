using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiTrapped.Controllers
{
    [ApiController]
    [EnableCors("http://localhost:3000")]
    [Produces("application/json")]
    [Route("[controller]")]
    public class TrappedController : ControllerBase
    {
        private readonly ILogger<TrappedController> _logger;

        public TrappedController(ILogger<TrappedController> logger)
        {
            _logger = logger;

        }

        [HttpGet]
        [Route("PlayerData")]
        public PlayerData Initial(string username)
        {
            var repo = new Repository();
            var data = repo.getPlayerData(username);
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Headers.Add("Access-Control-Allow-Headers", "*");
            return data;
        }

        [HttpPost]
        [Route("PlayerData")]
        public bool addUser(string username)
        {
            var repo = new Repository();
            var data = repo.addUser(username);
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Headers.Add("Access-Control-Allow-Headers", "*");
            return data;
        }
    }
}
