const connectKaikas = async () => {
  if (window.klaytn) {
    try {
      const accounts = await window.klaytn.enable();
      window.klaytn.autoRefreshOnNetworkChange = false;
      if (accounts) {
        window.localStorage.setItem("connectorId", "Kaikas");
        window.localStorage.setItem("account", accounts[0]);
        return accounts[0];
      }
    } catch (error) {
      console.log("kaikas error", error);
      return "";
    }
  }else{
    
  }
};

export default connectKaikas;
