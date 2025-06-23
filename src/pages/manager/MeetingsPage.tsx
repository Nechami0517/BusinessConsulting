import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateMeeting } from '../../store/slices/meetingsSlice';
import { Calendar, Clock, User, Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const MeetingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { meetings, isLoading, error } = useAppSelector((state) => state.meetings);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Meeting Management</h2>
        <div className="text-sm text-gray-600">
          {meetings.length} total meetings
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.map((meeting) => {
          const service = services.find(s => s.id === meeting.serviceId);
          const client = meetings.find(client => client.id === meeting.);
          return (
            <div key={meeting.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{service?.name}</h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(meeting.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(meeting.status)}`}>
                        {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <div>
                        <p className="font-medium text-gray-900">{meeting.clientName}</p>
                        <p>{meeting.clientEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <div>
                        <p className="font-medium text-gray-900">{meeting.date}</p>
                        <p>{meeting.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <div>
                        <p className="font-medium text-gray-900">{service?.duration} minutes</p>
                        <p>${service?.price}</p>
                      </div>
                    </div>
                  </div>

                  {meeting.notes && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <strong>Notes:</strong> {meeting.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:ml-6">
                  {meeting.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(meeting.id, 'confirmed')}
                        disabled={isLoading}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(meeting.id, 'cancelled')}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {meeting.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(meeting.id, 'completed')}
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => handleStatusChange(meeting.id, 'cancelled')}
                        disabled={isLoading}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {meetings.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No meetings scheduled yet</p>
            <p className="text-sm text-gray-500">Meetings will appear here when clients book your services</p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default MeetingsPage;