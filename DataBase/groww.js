import axios from 'axios';

export const topGainer = async (req ,res) => {

    try {
        const cookie = 'eyJraWQiOiJXTTZDLVEiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MTkwNTY3ODYsImlhdCI6MTcxODc3MjUxNSwibmJmIjoxNzE4NzcyNDY1LCJzdWIiOiJ7XCJlbWFpbElkXCI6XCJjaGFuZGFucHVyYmV5NzU0QGdtYWlsLmNvbVwiLFwicGxhdGZvcm1cIjpcIndlYlwiLFwicGxhdGZvcm1WZXJzaW9uXCI6bnVsbCxcIm9zXCI6bnVsbCxcIm9zVmVyc2lvblwiOm51bGwsXCJpcEFkZHJlc3NcIjpcIjI0MDU6MjAxOjUwMjM6NDg1YjpmMDRlOjgwZDplY2FlOjE4NWYsXCIsXCJtYWNBZGRyZXNzXCI6bnVsbCxcInVzZXJBZ2VudFwiOlwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyNS4wLjAuMCBTYWZhcmkvNTM3LjM2XCIsXCJncm93d1VzZXJBZ2VudFwiOm51bGwsXCJkZXZpY2VJZFwiOlwiMWI3MTI2MmUtMDE2Yy01Mjc4LTkzMjctMmVhZjU3N2FhMzlhXCIsXCJzZXNzaW9uSWRcIjpcImUwN2Y5Mjk4LWM2Y2YtNGVhNC1hYzRkLTA0NThlNjQ3YjA2MFwiLFwic3VwZXJBY2NvdW50SWRcIjpcIkFDQzkyNjA1MDEyNTcxMjM0XCIsXCJ1c2VyQWNjb3VudElkXCI6XCJBQ0M5MjYwNTAxMjU3MTIzNFwiLFwidHlwZVwiOlwiQVRcIixcInRva2VuRXhwaXJ5XCI6MTcxOTA1Njc4NjY2NixcInRva2VuSWRcIjpcImU1NzllYWJiLWI0OTItNDQyMy05YWUwLTYzYWE0N2U0ZmQyMVwifSIsImlzcyI6Imdyb3d3YmlsbGlvbm1pbGxlbm5pYWwifQ.oeFhptdqHMYU6GkJbzWfqev1KlDvVr_kpAyToC2ljBb29KG0fslLvroWGSPnQsa3YMxB5sfxXTAT052quhHP6A'
  
        const response = await axios.get(`https://groww.in/v1/api/stocks_data/explore/v2/indices/GIDXNIFTY100/market_trends?discovery_filter_types=TOP_GAINERS&size=10`, {
            headers: {
                'Authorization': `Bearer ${cookie}`
            }
        });
    
        res.json(response.data); // Assuming you want to send the data back to the client
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}