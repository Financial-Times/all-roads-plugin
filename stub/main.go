package main

import (
	"log"
	"net/http"
	"net/http/httputil"
)

const response = `[
	{
		"byline": "Lauren Fedor in London",
		"publishedDate": "2016-11-29T10:22:57.000Z",
		"standfirst": "UK watchdog follows up curb on payday lenders with probe into other loan products",
		"title": "FCA considers tighter curbs on high-cost consumer credit",
		"webUrl": "http://www.ft.com/cms/s/a72cb3aa-b60c-11e6-961e-a1acd97f622d.html",
		"annotation": {
			"prefLabel": "London"
		}
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
