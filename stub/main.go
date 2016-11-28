package main

import (
	"log"
	"net/http"
	"net/http/httputil"
)

const response = `[
  {
    "title": "The Trump factor: can infrastructure rebuild your investments?",
    "webUrl": "http://www.ft.com/cms/s/630652cc-a819-11e6-8898-79a99e2a4de6.html"
  },
  {
    "title": "Trump win means I'm investing in Russia, gold and avoiding US equities",
    "webUrl": "http://www.ft.com/cms/s/818c1d76-a684-11e6-8b69-02899e8bd9d1.html"
  }
]`

func main() {
	http.HandleFunc("/suggest", suggest())
	err := http.ListenAndServe(":8080", nil)
	log.Fatal(err)
}

func suggest() func(w http.ResponseWriter, req *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		dump, _ := httputil.DumpRequest(req, true)
		log.Println(string(dump))

		w.Write([]byte(response))
	}
}
