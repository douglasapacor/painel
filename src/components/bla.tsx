import { Box, CircularProgress, MenuItem, Select } from "@mui/material"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"

interface ApiResponse {
  items: { id: number; name: string }[]
  total: number
}

const InfiniteScrollSelect: React.FC = () => {
  const [items, setItems] = useState<{ id: number; name: string }[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [value, setValue] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const fetchItems = async (pageNum: number) => {
    try {
      setLoading(true)

      const response = await axios.get<ApiResponse>("SUA_API_URL", {
        params: { limit, page: pageNum }
      })
      const newItems = response.data.items

      setItems(prev => [...prev, ...newItems])
      setHasMore(newItems.length === limit)
    } catch (error) {
      console.error("Erro ao buscar itens:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems(page)
  }, [page])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    const bottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 1

    if (bottom && !loading && hasMore) {
      setPage(prev => prev + 1)
    }
  }

  const handleMenuOpen = () => {
    setTimeout(() => {
      const menu = document.querySelector(".MuiMenu-list")
      if (menu) {
        menuRef.current = menu as HTMLDivElement
        menuRef.current.addEventListener("scroll", handleScroll as any)
      }
    }, 0)
  }

  const handleMenuClose = () => {
    if (menuRef.current) {
      menuRef.current.removeEventListener("scroll", handleScroll as any)
      menuRef.current = null
    }
  }

  return (
    <Box sx={{ width: 300 }}>
      <Select
        value={value || ""}
        onChange={e => setValue(e.target.value as string)}
        onOpen={handleMenuOpen}
        onClose={handleMenuClose}
        displayEmpty
        fullWidth
        MenuProps={{
          PaperProps: {
            style: { maxHeight: 300 }
          },
          classes: {
            list: "minha-classe-personalizada" // Aplica a classe ao <ul>
          }
        }}
      >
        <MenuItem value="" disabled>
          Selecione uma opção
        </MenuItem>
        {items.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
        {loading && (
          <MenuItem disabled>
            <CircularProgress size={24} />
          </MenuItem>
        )}
      </Select>
    </Box>
  )
}

export default InfiniteScrollSelect
