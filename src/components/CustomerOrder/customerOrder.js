import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSpecificData } from '../../Utils/utils'

const CustomerOrder = () => {
    const [detailsdData, setDetailsData] = useState(
        {
            billToAddress: "",
            businessName: "",
            city: "",
            compId: "",
            email: "",
            state: '',
            iD: "",
            phone: '',
            postalCode: '',
            responsibleName: "",
            responsiblePhone: "",
            secondaryPhone: ""
        }
    )
    const { slug, Cname } = useParams()
    const history = useHistory();
    useEffect(() => {
        getSpecificData(slug, Cname).then(data => {
            setDetailsData(data[0])
        })
    }, [])
    console.log('customer order data', detailsdData);
    return(
        <div>
            <h2>
                customer order
            </h2>
        </div>
    )
}
export default CustomerOrder