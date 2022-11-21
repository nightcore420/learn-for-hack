package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "hai")
	})

	router.GET("/list", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"nama":   "Hacktoberfest",
			"status": "hacktoberfest-accepted",
		})
	})

	router.Run()
}
