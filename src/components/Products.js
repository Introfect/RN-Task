import React,{useState,useEffect} from 'react'
import {data} from "../data"
import FormSelect from './FormComponents/FormSelect'
import { Button } from '@mui/material'
import FilterPopup from './FilterPopup'
import { indigo } from '@mui/material/colors'

const Products = () => {
  const [locationMap,setLocationMap]=useState([])
  const [propertyMap,setPropertyMap]=useState([])
  const [dateMap, setDateMap]=useState([])
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [show, setShow]=useState(false)
  const [filter, setFilter]=useState(data)
  const priceMap=['500 - 1500','1600 - 2500','2600 - 3500','3500 - 10000']
  useEffect(()=>{
    const location=data.map((item)=>item.location)
    const uniqueLocation= location && Array.from(new Set(location))
    location && setLocationMap(uniqueLocation);
    const property= data.map(item=>item.propertyType)
    const uniqueProperty= property && Array.from(new Set(property))
    property && setPropertyMap(uniqueProperty )
    const date=data.map((item)=>item.date)
    const uniqueDate= date && Array.from(new Set(date))
    setDateMap(uniqueDate)
  },[])
  const handleClearFilters = () => {
    setSelectedLocation('');
    setSelectedDate('');
    setSelectedPrice('');
    setSelectedPropertyType('');
    setShow(false)
    handleFilterClick()
  
  };
  const filterProperties = () => {
    let filteredProperties = data;

    if (selectedLocation) {
      filteredProperties = filteredProperties.filter(property => property.location === selectedLocation);
    }

    if (selectedDate) {
      filteredProperties = filteredProperties.filter(property => property.date === selectedDate);
    }

    if (selectedPrice) {
      console.log(selectedPrice)
      const [minPrice, maxPrice] = selectedPrice.split(' - ');
      console.log("min",minPrice)
     filteredProperties = data.filter(item => item.price >= parseInt(minPrice) && item.price <= parseInt(maxPrice));
    }

    if (selectedPropertyType) {
      filteredProperties = filteredProperties.filter(property => property.propertyType === selectedPropertyType);
    }

    return filteredProperties;
  };


  const handleFilterClick = () => {
    const filteredData = filterProperties();
     setFilter(filteredData)
    console.log("no data",filteredData)
    setShow(false)

  };
  return (
    <div className='bg-gray-300/50 mx-auto max-w-7xl reltive '>
      <h1
      className='text-2xl font-bold md:text-4xl md:font-extrabold lg:text-5xl'
      >Search Properties to rent</h1>
      <div className='flex justify-center md:hidden'>
        <div className='bg-indigo-500 text-white p-3 max-w-min font-semibold cursor-pointer rounded-md px-5'
        onClick={() => setShow(true)}
        >Filters</div>
      </div>
      <div>

      {show ? (
        <FilterPopup
        show={show}
        setShow={setShow}
        locationMap={locationMap}
        setSelectedLocation={setSelectedLocation}
        dateMap={dateMap}
        setSelectedDate={setSelectedDate}
        priceMap={priceMap}
        setSelectedPrice={setSelectedPrice}
        propertyMap={propertyMap}
        setSelectedPropertyType={setSelectedPropertyType}
        handleFilterClick={handleFilterClick}
        handleClearFilters={handleClearFilters}

        />
       
      ) : null}
      
      <div  className="hidden md:flex md:w-full justify-around items-center  inset-0 z-20 left-4 right-auto max-h-min bg-white py-2 rounded-md drop-shadow-md overflow-y-auto">
       <FormSelect
            type={"location"} 
            size="small"
            single={true}
            dropDown={locationMap && locationMap}
            onValueChange={(e) => setSelectedLocation(e)}
            />
            <FormSelect
            type={"Move in Date"} 
            size="small"
            single={true}
            dropDown={dateMap && dateMap}
            onValueChange={(e) => setSelectedDate(e)}
            />
            <FormSelect
            type={"Price"} 
            size="small"
            single={true}
            dropDown={priceMap}
            onValueChange={(e) => setSelectedPrice(e)}
            />
            <FormSelect
            type={"Property"} 
            size="small"
            single={true}
            dropDown={propertyMap && propertyMap}
            onValueChange={(e) => setSelectedPropertyType(e)}
            />
            <div className='flex space-x-4 items-center'>

             <Button
            variant="contained"
            sx={{backgroundColor:indigo[500],
            minWidth:100,
            height:40,
            borderRadius:2,
            fontWeight:'bold'
            }}
            onClick={handleFilterClick}
            >
              Search
            </Button>
            <Button
            variant="contained"
            sx={{
              backgroundColor:indigo[500],
              minWidth:150,
              height:40,
              borderRadius:2,
              fontWeight:'bold'
            }}
            onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
            </div>
      </div>
      <div class="mx-auto grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">

        {filter.length? (filter.map((item)=>{
        
        return (
          <article class="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
          <a href="#" class="block h-full w-full">
            <img class="max-h-40 w-full object-cover" alt="featured image" src="https://images.unsplash.com/photo-1660241588741-d653d53348fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
            <div class="w-full bg-white p-4">
              <p class="text-md font-medium text-indigo-500"><span
              className='font-black'
              >`${item.price}</span>/month`</p>
              <p class="mb-2 text-xl text-gray-800 font-bold">{item.location}</p>
              <p class="text-md font-light text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?</p>
              <div class="justify-starts mt-4 flex flex-wrap items-center">
                <div class="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">#js</div>
                <div class="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">#icefactory</div>
              </div>
            </div>
          </a>
        </article>
        )})):
        <h1>No result matching your filters</h1>
       }
      </div>

    </div>
    </div>
  )
}

export default Products