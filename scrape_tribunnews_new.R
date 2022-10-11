library(rvest)

urltribun <- 'https://www.tribunnews.com/tag/prabowo-subianto'
halaman_akhir <- 4

map_df(1:halaman_akhir, function(i) {  
  cat('.')
  laman <- read_html(sprintf(urltribun, i))
  
  data.frame(
    JudulBerita = html_text(html_nodes(laman,'.ln24')),
    stringsAsFactors = FALSE
  )
}) -> BeritaTribunnewsCom

View(BeritaTribunnewsCom)
