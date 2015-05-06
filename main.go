package main

import (
	"fmt"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gin-gonic/gin"
	"github.com/justinas/nosurf"
)

type DB struct{}

func index(c *gin.Context) {

	db := getDB(c)
	// db.Select("SELECT * FROM ...")
	fmt.Println("DB", db)

	s := &struct {
		URL        string
		CSRF       string
		Production bool
		InitData   string
	}{
		URL:        c.Request.URL.Path,
		CSRF:       nosurf.Token(c.Request),
		Production: false,
		InitData:   "{ \"MessageStore\": { \"messages\": [ {\"level\": \"success\", \"text\": \"Welcome\" }] } }",
	}

	c.HTML(http.StatusOK, "index.tmpl", s)
}

func getDB(c *gin.Context) *DB {
	return c.MustGet("DB").(*DB)
}

func withDB(db *DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("DB", db)
		c.Next()
	}
}

func main() {

	db := &DB{}

	r := gin.Default()
	r.LoadHTMLGlob("templates/*")

	dbgrp := r.Group("/")
	dbgrp.Use(withDB(db))
	dbgrp.GET("/", index)

	r.Static("/js/", "./public/js")
	r.Static("/css/", "./public/css")

	n := negroni.Classic()
	n.UseHandler(nosurf.New(r))
	n.Run(":4040")
}
