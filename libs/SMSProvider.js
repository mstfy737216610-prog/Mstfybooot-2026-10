// BJS Library for SMS Providers
// Converted from PHP teampro.php & api-sites.php
// Supports 5sim, tempnum, sms-man, vak, onlinesim, grizzly, tiger, simsms, herosms, etc.

function getProviderRequest(site, action, params) {
  var api_key = params.api_key || "";
  var country = params.country || "";
  var app = params.app || "";
  var operator = params.operator || "any";
  var idnumber = params.idnumber || "";
  var number = params.number || "";

  var headers = {
    "Accept": "application/json"
  };

  // 1. 5sim.biz
  if (site === "5sim") {
    headers["Authorization"] = "Bearer " + api_key;
    if (action === "getNum") {
      return {
        url: "https://5sim.biz/v1/user/buy/activation/" + country + "/" + operator + "/" + app,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getStatus") {
      return {
        url: "https://5sim.biz/v1/user/check/" + idnumber,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "setStatus" || action === "finish") {
      return {
        url: "https://5sim.biz/v1/user/finish/" + idnumber,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "addBlack" || action === "ban") {
      return {
        url: "https://5sim.biz/v1/user/ban/" + idnumber,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getBalance") {
      return {
        url: "https://5sim.biz/v1/user/profile",
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getPrice") {
      return {
        url: "https://5sim.biz/v1/guest/prices?country=" + country + "&product=" + app,
        headers: headers,
        method: "GET"
      };
    }
  }

  // 2. tempnum.org
  if (site === "tempnum") {
    if (action === "getNum") {
      return {
        url: "https://tempnum.org/stubs/handler_api.php?api_key=" + api_key + "&action=getNumber&service=" + app + "&country=" + country,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getStatus") {
      return {
        url: "https://tempnum.org/stubs/handler_api.php?action=getStatus&api_key=" + api_key + "&id=" + idnumber,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "addBlack" || action === "ban") {
      return {
        url: "https://tempnum.org/stubs/handler_api.php?api_key=" + api_key + "&action=setStatus&id=" + idnumber + "&status=8",
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getBalance") {
      return {
        url: "https://tempnum.org/stubs/handler_api.php?api_key=" + api_key + "&action=getBalance",
        headers: headers,
        method: "GET"
      };
    }
  }

  // 3. sms-man.ru
  if (site === "man") {
    if (action === "getNum") {
      return {
        url: "http://api.sms-man.ru/stubs/handler_api.php?action=getNumber&api_key=" + api_key + "&service=" + app + "&country=" + country,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getStatus") {
      return {
        url: "http://api.sms-man.ru/stubs/handler_api.php?action=getStatus&api_key=" + api_key + "&id=" + idnumber,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "setStatus") {
      return {
        url: "http://api.sms-man.ru/stubs/handler_api.php?action=setStatus&api_key=" + api_key + "&id=" + idnumber + "&status=6",
        headers: headers,
        method: "GET"
      };
    }
    if (action === "addBlack") {
      return {
        url: "http://api.sms-man.ru/stubs/handler_api.php?action=setStatus&api_key=" + api_key + "&id=" + idnumber + "&status=-1",
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getBalance") {
      return {
        url: "http://api.sms-man.ru/stubs/handler_api.php?action=getBalance&api_key=" + api_key,
        headers: headers,
        method: "GET"
      };
    }
  }

  // 4. Vak-sms.com
  if (site === "vak") {
    if (action === "getNum") {
      return {
        url: "https://vak-sms.com/api/getNumber/?apiKey=" + api_key + "&app=" + app + "&country=" + country,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getStatus") {
      return {
        url: "https://vak-sms.com/api/getSmsCode/?apiKey=" + api_key + "&idNum=" + idnumber,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "addBlack") {
      return {
        url: "https://vak-sms.com/api/setStatus/?apiKey=" + api_key + "&status=bad&idNum=" + idnumber,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getBalance") {
      return {
        url: "https://vak-sms.com/stubs/handler_api.php?api_key=" + api_key + "&action=getBalance",
        headers: headers,
        method: "GET"
      };
    }
  }

  // 5. GrizzlySMS
  if (site === "grizzly") {
    if (action === "getNum") {
      return {
        url: "https://api.grizzlysms.com/stubs/handler_api.php?api_key=" + api_key + "&action=getNumber&app=" + app + "&country=" + country,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getStatus") {
      return {
        url: "https://api.grizzlysms.com/stubs/handler_api.php?api_key=" + api_key + "&action=getStatus&id=" + idnumber,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getBalance") {
      return {
        url: "https://api.grizzlysms.com/stubs/handler_api.php?api_key=" + api_key + "&action=getBalance",
        headers: headers,
        method: "GET"
      };
    }
  }

  // 6. Tiger-SMS
  if (site === "tiger") {
    if (action === "getNum") {
      return {
        url: "https://tiger-sms.com/stubs/handler_api.php?api_key=" + api_key + "&action=getNumber&app=" + app + "&country=" + country,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getStatus") {
      return {
        url: "https://tiger-sms.com/stubs/handler_api.php?api_key=" + api_key + "&action=getStatus&id=" + idnumber,
        headers: headers,
        method: "GET"
      };
    }
    if (action === "getBalance") {
      return {
        url: "https://tiger-sms.com/stubs/handler_api.php?api_key=" + api_key + "&action=getBalance",
        headers: headers,
        method: "GET"
      };
    }
  }

  // Default fallback (Hero-SMS / Generic)
  if (site === "herosms") {
    headers["Authorization"] = "ApiKey " + api_key;
    headers["Content-Type"] = "application/json";
    if (action === "getNum") {
      var body = { service: app, country: parseInt(country) || 0 };
      return { url: "https://hero-sms.com/api/v1/activations", headers: headers, method: "POST", body: JSON.stringify(body) };
    }
    if (action === "getStatus") {
      return { url: "https://hero-sms.com/api/v1/activations", headers: headers, method: "GET" };
    }
    if (action === "getBalance") {
      return { url: "https://hero-sms.com/api/v1/activations/stats", headers: headers, method: "GET" };
    }
  }

  return null;
}

publish({
  getProviderRequest: getProviderRequest
});
