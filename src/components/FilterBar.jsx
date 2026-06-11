function FilterBar({
  categories,
  category,
  setCategory,
  search,
  setSearch,
  sort,
  setSort,
  rating,
  setRating,
}) {
  return (
    <div className="filter-bar">

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="">All Category</option>

        {categories.map((cat) => (
          <option key={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
      >
        <option value="">
          Sort Price
        </option>

        <option value="asc">
          Low → High
        </option>

        <option value="desc">
          High → Low
        </option>
      </select>

      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
      >
        <option value="0">
          Rating
        </option>

        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
      </select>
    </div>
  );
}

export default FilterBar;