import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateMeeting } from '../../store/slices/meetingsSlice';
import { Calendar, Clock, User, Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const MeetingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { meetings, isLoading, error } = useAppSelector((state) => state.Meetings);
  const { services } = useAppSelector((state) => state.services);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusChange = (meetingId: string, newStatus: string) => {
    dispatch(updateMeeting({ 
      id: meetingId, 
      data: { status: newStatus as any } 
    }));
  };

  return (
<div></div>)

}
export default MeetingsPage;