import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchSubtitles = async () => {
    try {
      setError("");
      setData(null);
      const res = await axios.get("http://localhost:5000/get_subtitle", {
        params: { url },
      });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "에러가 발생했습니다.");
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-4 text-center">
        <h1 className="text-3xl font-bold">YouTube 자막 뷰어</h1>

        <input
          type="text"
          placeholder="YouTube 링크 입력"
          className="w-full p-3 rounded border"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={fetchSubtitles}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          자막 불러오기
        </button>

        {error && <p className="text-red-500">{error}</p>}

        {data && (
          <div className="bg-white p-4 rounded shadow mt-6 text-left">
            <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {data.subtitles.map((item, idx) => (
                <div key={idx}>
                  <span className="text-sm text-gray-500 mr-2">
                    [{item.time}]
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
