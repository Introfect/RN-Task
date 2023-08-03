import React from 'react'
import FormSelect from './FormComponents/FormSelect'
import { Button } from '@mui/material'
import { indigo } from '@mui/material/colors'


const FilterPopup = ({show,setShow,locationMap,setSelectedLocation,dateMap,setSelectedDate,priceMap,setSelectedPrice,propertyMap,setSelectedPropertyType,handleFilterClick,handleClearFilters}) => {
  return (
    <>
      <div
        className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
         <div className="relative mx-10 w-full my-6">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">
                Select Filters
              </h3>
              
            </div>
          </div>
     <div  className="justify-around  inset-0 z-20 left-4 right-auto max-h-min bg-white py-2 rounded-md drop-shadow-md overflow-y-auto">
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
            <div 
            className='flex justify-center space-x-5'
            >

             <Button
            variant="contained"
            sx={{backgroundColor:indigo[500]}}
            onClick={handleFilterClick}
            >
              Search
            </Button>
            <Button
            variant="contained"
            sx={{backgroundColor:indigo[500]}}
            onClick={
              handleClearFilters
              
            }
            
            >
              Clear Filters
            </Button>
            </div>
      </div>
    
       
          {/*content*/}
        
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default FilterPopup