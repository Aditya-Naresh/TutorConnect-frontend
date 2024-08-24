import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosGet } from '../../axios';
import { BiTrash } from 'react-icons/bi';
import axiosDelete from '../../axios/axiosDelete';
import { toast } from 'react-toastify';

const CertificationsList = ({update}) => {
  const [certificates, setCertificates] = useState([]);
  const token = useSelector((state) => state.auth.access);
  const [showForm, setShowForm] = useState(false) 
  const [render, setRender] = useState('')

  useEffect(() => {
    const fetchCertificates = async () => {
     
      try {
        const response = await axiosGet('accounts/certificates/', token);
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, [update, render]);

  

  const onDelete = async (id) => {
    try {
      const response = await axiosDelete(`accounts/certificates/${id}`, token)
      if( response.status === 204){
        toast.success('Deleted the certificate')
        setRender(`Deleted ${id}`)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="relative">
      <h2 className="text-xl text-lime-900 font-bold mb-4">Certifications :</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Image</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((cert) => (
            <tr key={cert.id}>
              <td className="py-2 px-4 border-b">{cert.title}</td>
              <td className="py-2 px-4 border-b flex">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-16 w-16 object-cover"
                />
                <button
              className="ml-2 mt-2 bg-red-500 text-sm rounded px-4 h-[50px]"
              onClick={() => onDelete(cert.id)}
            >
              <BiTrash color="white" />
            </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default CertificationsList;
