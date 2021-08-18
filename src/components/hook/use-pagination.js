import  {useState, useEffect } from 'react';
    const usePagination = (data, pageLimit, dataLimit) =>{
    const pages = Math.round(data.length / dataLimit);
    // pageLimit: number of pagination we want to show
    // dataLimit: number of page in one side
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() =>{
        window.scrollTo({behavior: 'auto', top: '0px'});

    }, [currentPage])
    const gotoNextPage = () =>{
        setCurrentPage(prevState => {
            return prevState + 1;
        })
    }
    const gotoPrevPage = () =>{
        setCurrentPage(prevState =>{
            return prevState - 1;
        })
    }
    const changePage = (event) =>{
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
    const getPaginatedData = () =>{
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    }
    const getPaginationGroup = () =>{
        const pageNumbers = [];
        for(let i = 1; i <= Math.ceil(data.length / pageLimit); i++){
            pageNumbers.push(i);
        }
        // let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        // return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
        return pageNumbers;
    }
    return {
        nextPage: gotoNextPage,
        prevPage: gotoPrevPage,
        pages: getPaginatedData,
        currentPage: currentPage,
        paginationGroup: getPaginationGroup,
        changeThePage: changePage,
        ourPagesTotal: pages
    }
}

export default usePagination;